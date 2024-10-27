const mongoose = require('mongoose');

// Define the cart schema
const CartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true // Ensure the customer reference is provided
    },
    subTotal: {
        type: Number,
        default: 0.00,
        min: [0, 'SubTotal cannot be negative'] // Validate that subTotal is not negative
    },
    tax: {
        type: Number,
        default: 0.00,
        min: [0, 'Tax cannot be negative'] // Validate that tax is not negative
    },
    grandTotal: {
        type: Number,
        default: 0.00,
        min: [0, 'GrandTotal cannot be negative'] // Validate that grandTotal is not negative
    },
    placedOrder: {
        type: Boolean,
        default: false // Indicates if the order is placed
    }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the cart model
const cartModel = mongoose.model('Cart', CartSchema);

module.exports = cartModel;
