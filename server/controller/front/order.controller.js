const { default: mongoose } = require("mongoose");
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
    console.log("USER-ID:", userId);

    // Check if userId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const orders = await orderModel.find({ customer: userId })
      .populate("customer")
      .populate("paymentId");

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
        order: [],
      });
    }

    const orderObject = [];

    for (const order of orders) {
      const items = await orderItemModel.find({ order: order._id }).populate("product");
      orderObject.push({ ...order._doc, items });
    }

    return res.json({
      success: true,
      message: "User orders retrieved successfully",
      order: orderObject,
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
