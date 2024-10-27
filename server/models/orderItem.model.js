const mongoose = require('mongoose');

// Define order item schema
const orderItemSchema = new mongoose.Schema({
    order: {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true // Ensuring an order is always associated with the order item
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true // Ensuring a product is always associated with the order item
    },
    quantity: {
        type: Number,
        default: 0,
        min: [0, 'Quantity cannot be negative'] // Ensuring quantity is non-negative
    },
    size: {
        type: String, // Single size as a string
        required: true, // Ensure size is provided
        enum: ['s', 'm', 'x', 'xl'], // Define allowed sizes
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the order item model
const orderItemModel = mongoose.model('OrderItem', orderItemSchema);

module.exports = orderItemModel;
