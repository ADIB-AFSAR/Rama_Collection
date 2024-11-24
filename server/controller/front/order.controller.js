const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrder = async (req, res) => {
    try {
        // Fetch all orders and populate both the customer and paymentId
        let orders = await orderModel.find().populate("customer").populate("paymentId");

        let orderObject = [];
        for (const order of orders) {
            // Fetch the associated items for each order and populate the product field
            let items = await orderItemModel.find({ order: order._id }).populate("product");

            // Add the items and other order data to the order object
            orderObject.push({
                ...order._doc,
                items: [...items]
            });
        }

        res.json({
            message: "Order retrieved successfully",
            orders: orderObject
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error retrieving orders" });
    }
};

module.exports = {
    getOrder,
};
