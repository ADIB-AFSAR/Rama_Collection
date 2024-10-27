const mongoose = require('mongoose');

// Define billing address sub-schema for better structure
const billingAddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
}, { _id: false }); // Disable automatic ID generation for sub-documents

// Define the order schema
const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true // Ensure that an order is associated with a customer
    },
    billingAddress: {
        type: Object,
        default: {} // Corrected from defaultValue
    },
    subTotal: {
        type: Number,
        default: 0.00,
        min: [0, 'SubTotal cannot be negative'] // Ensure non-negative
    },
    tax: {
        type: Number,
        default: 0.00,
        min: [0, 'Tax cannot be negative'] // Ensure non-negative
    },
    grandTotal: {
        type: Number,
        default: 0.00,
        min: [0, 'Grand Total cannot be negative'] // Ensure non-negative
    },
    placedOrder: {
        type: Boolean,
        default: false
    },
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the order model
const orderModel = mongoose.model('Order', OrderSchema);

module.exports = orderModel;
