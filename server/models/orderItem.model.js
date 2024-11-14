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
    }
    // size: {
    //     type: String,  
    //     required: true,  
    //     enum: ['s', 'm', 'x', 'xl'],  
    // }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the order item model
const orderItemModel = mongoose.model('OrderItem', orderItemSchema);

module.exports = orderItemModel;
