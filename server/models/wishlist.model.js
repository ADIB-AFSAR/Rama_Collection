// models/wishlistModel.js
const mongoose = require('mongoose');

// Define the schema for the wishlist item
const wishlistItemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model 
        ref: 'User ' // Assuming you have a User model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model 
        ref: 'Product' // Assuming you have a Product model
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    }
});

// Create the model from the schema
const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

// Export the model
module.exports = WishlistItem;