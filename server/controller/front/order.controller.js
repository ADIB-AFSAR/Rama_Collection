const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrder = async (req, res) => {
  try {
    const orders = await orderModel.find()
      .populate("customer")
      .populate("paymentId");

    const orderObject = await Promise.all(
      orders.map(async (order) => {
        const items = await orderItemModel.find({ order: order._id }).populate("product");
        return { ...order._doc, items };
      })
    );

    res.json({
      message: "order retrieved successfully",
      order: orderObject
    });

  } catch (err) {
    console.error("Error in getOrder:", err);
    res.status(500).json({ message: "Server error" });
  }
};


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
