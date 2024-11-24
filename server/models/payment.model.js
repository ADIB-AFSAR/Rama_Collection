const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  payerName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  screenshotUrl: { type: String }, // Optional, only required for UPI payments
  orderDetails: { type: Object, required: true }, // Storing order details
  type: { type: String, enum: ["cod", "upi"], required: true }, // Payment type
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
