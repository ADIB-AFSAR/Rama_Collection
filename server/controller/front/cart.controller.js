const cartModel = require("../../models/cart.model");
const cartItemModel = require("../../models/cartItem.model");
const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const productModel = require("../../models/product.model");
const nodemailer = require('nodemailer');
const Payment = require("../../models/payment.model");

const getCart = async (req, res) => {
    try {
        const currentCart = await cartModel.findOne({
            customer: req.user._id,
            placedOrder: false
        }).populate('customer');

        if (!currentCart) {
            return res.json({ currentCart: {} });
        }

        const response = await collectTotal(currentCart.id);
        res.json({ currentCart: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCart = async (req, res) => {
    console.log(req.body)
    try {
        const { id: productId } = req.params;
        let currentCart = await cartModel.findOne({
            customer: req.user._id,
            placedOrder: false
        });

        if (currentCart) {
            const item = await cartItemModel.findOne({
                product: productId,
                cart: currentCart._id
            });

            if (item) {
                await cartItemModel.updateOne({ _id: item._id }, {
                    quantity: item.quantity + 1
                });
            } else {
                await cartItemModel.create({
                    cart: currentCart._id,
                    product: productId,
                    quantity: 1
                });
            }
        } else {
            currentCart = await cartModel.create({ customer: req.user._id });
            await cartItemModel.create({
                cart: currentCart._id,
                product: productId,
                quantity: 1
            });
        }

        const response = await collectTotal(currentCart._id);
        return res.json({ currentCart: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { itemId, cartId, quantity } = req.body; // Include size if necessary
        await cartItemModel.updateOne({ _id: itemId, cart: cartId }, {
            quantity: quantity
        });
        const response = await collectTotal(cartId);
        return res.json({ currentCart: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCart = async (req, res) => {
    console.log(req.params.id)
    try {
        const item = await cartItemModel.findOne({ _id: req.params.id });
        if (item) {
            await cartItemModel.deleteOne({ _id: req.params.id });
            return res.status(200).json({ message: "Item deleted successfully" });
        } 
        return res.status(404).json({ message: "Item not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const collectTotal = async (id) => {
    const cart = await cartModel.findOne({ _id: id }).populate('customer');
    const cartItems = await cartItemModel.find({ cart: cart._id }).populate("product");

    let subTotal = 0;
    for (const item of cartItems) {
        subTotal += item.product?.price * item.quantity || 0; // Safely handle potential undefined price
    }

    const tax = 0; // You can adjust this based on your requirements
    const grandTotal = subTotal + tax;

    await cartModel.updateOne({ _id: id }, {
        subTotal: subTotal,
        tax: tax,
        grandTotal: grandTotal
    });

    return { ...cart._doc, items: cartItems };
};

const placeOrder = async (req, res) => {
    console.log("placeorder:", req.body, req.params);
    try {
        const cart = await cartModel.findOne({ _id: req.params.cartId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItems = await cartItemModel.find({ cart: cart._id });

        // Check if the order has already been paid (either through Stripe or another method)
        const existingPayment = await Payment.findOne({ 
            "orderDetails.orderId": cart._id, 
            status: "Completed" // Check for a completed payment
        });
        let payment;

        if (existingPayment) {
            // If payment already exists, skip payment recording and just place the order
            payment = existingPayment;
            console.log("Payment already completed for this order. Skipping payment recording.");
        } else {
            // If no payment exists, proceed with payment recording
           payment =  await recordPayment({
                payerName: req.body.billingAddress.name,
                amount: cart.grandTotal,
                type: req.body.billingAddress.payment, // Payment type (UPI, COD, etc.)
                orderDetails: { orderId: cart._id },
                userID: cart.customer,
                status: "Pending", // Default status, which can be updated later
            });
        }
        console.log("Payment:",payment)
        // Create the order
        const order = await orderModel.create({
            customer: cart.customer,
            subTotal: cart.subTotal,
            tax: cart.tax,
            grandTotal: cart.grandTotal,
            billingAddress: req.body.billingAddress,
            placedOrder: true,
            paymentId : payment?._id
        });

        // Iterate over each cart item to create order items and update product quantities
        await Promise.all(cartItems.map(async (item) => {
            // Create order item
            await orderItemModel.create({
                order: order._id,
                product: item.product,
                quantity: item.quantity
            });

            // Update product quantity in the product model
            await productModel.updateOne(
                { _id: item.product },
                { $inc: { quantity: -item.quantity } }
            );
        }));

        // Mark the cart as ordered
        await cartModel.updateOne({ _id: cart._id }, { placedOrder: true});
        return res.json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const stripePay = async (req, res) => {
    try {
        console.log("Stripe pay controller:",req.body)
        console.log("file : ", req.file)
        
        
        const { billingAddress, orderDetails} = req.body;
        if (!billingAddress) {
            throw new Error("Billing address is missing");
          }
        const { name } =  JSON.parse(billingAddress);
        const parsedDetails = JSON.parse(orderDetails);
        console.log("userID:",parsedDetails.order.customer._id)

        // Uploaded file information from Cloudinary
        const uploadedFileURL = req.file ? req.file.path : null; // Cloudinary automatically assigns a URL to the uploaded file
        
         // Record UPI payment
         const payment = new Payment({
            userID: parsedDetails.order.customer._id,
            payerName: name,
            amount: parsedDetails.order.grandTotal,
            screenshotUrl: uploadedFileURL,
            orderDetails: parsedDetails,
            type: "upi",
            status: "Pending",
        });
        await payment.save();

        // Update the cart with the paymentId
        await cartModel.updateOne(
            { _id: parsedDetails.order._id },
            { paymentId: payment._id }
        );

     
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: "New UPI Payment Received",
          text: `Order Details:\n\n${JSON.stringify(parsedDetails, null, 2)}`,
          attachments: uploadedFileURL
          ? [{ filename: "UPI-Screenshot.jpeg", path: uploadedFileURL }]
          : [],
        };
    
        await transporter.sendMail(mailOptions); // Update payment status to 'Completed' after email success
        
        res.status(200).json({ success: true, message: "UPI payment processed and recorded" });
      } catch (error) {
        console.error("Error in payment processing:", error.message);
        res.status(500).json({ success: false, message: "Payment failed" });
      }
};

const verifyPayment = async (req, res) => {
    const { paymentId } = req.params;
    console.log("verifyPayment:", req.params);
    try {
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        // Update the payment status and verification flag
        payment.status = "Completed"; // Change to 'Completed' once verified
        await payment.save();

        res.status(200).json({ message: "Payment successfully verified" });
    } catch (error) {
        console.error("Error verifying payment:", error.message);
        res.status(500).json({ message: error.message });
    }
};


const recordPayment = async ({ payerName, amount, type, screenshotUrl = null, orderDetails, userID }) => {
    console.log("recordPayment:", payerName, type);

    try {
        const newPayment = new Payment({
            userID,
            payerName,
            amount,
            screenshotUrl,
            orderDetails,
            type,
            status: "Pending", // Default to Pending for all payment types
        });

        const savedPayment = await newPayment.save();
        console.log("Saved Payment:", savedPayment); // Debugging log
        return savedPayment; // Explicitly return the saved payment document
    } catch (error) {
        console.error("Error in recordPayment:", error);
        throw new Error("Failed to record payment");
    }
};



module.exports = {
    getCart,
    addCart,
    deleteCart,
    updateCart,
    placeOrder,
    stripePay,
    verifyPayment
};
