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
    orderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Order', // Reference to the Order model
        default: null // Initially, it will be null, but updated once the order is placed
    },
    // size: {
    //     type: String,  
    //     required: true,  
    //     enum: ['s', 'm', 'x', 'xl'],  
    // }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the cart item model
const cartItemModel = mongoose.model('CartItem', cartItemSchema);

module.exports = cartItemModel;
