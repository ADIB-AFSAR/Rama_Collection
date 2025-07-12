const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrder = async(req , res) =>{
    let orders = await orderModel.find().populate("customer").populate("paymentId")
    let orderObject = []
    for(const order of orders){
      let items  = await orderItemModel.find({order : order._id}).populate("product")
        orderObject.push({...order._doc, items : [...items]})
    
   }
    res.json({
       message : "order retrieved succesfully",
       order : orderObject
   })
   }

   const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ customer: userId }).populate("customer").populate("paymentId");

        const orderObject = [];

        for (const order of orders) {
            const items = await orderItemModel.find({ order: order._id }).populate("product");
            orderObject.push({ ...order._doc, items });
        }

        res.json({
            success: true,
            message: "User orders retrieved successfully",
            order: orderObject
        });

    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    getOrder,
    getUserOrders
};
