const mongoose = require('mongoose');

// Define the cart item schema
const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
        required: true // Ensure cart reference is provided
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true // Ensure product reference is provided
    },
    quantity: {
        type: Number,
        default: 1, // Default quantity set to 1
        min: [0, 'Quantity cannot be negative'] // Ensure quantity is not negative
    },
    size: {
        type: String, // Single size as a string
        required: true, // Ensure size is provided
        enum: ['s', 'm', 'x', 'xl'], // Define allowed sizes
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the cart item model
const cartItemModel = mongoose.model('CartItem', cartItemSchema);

module.exports = cartItemModel;
