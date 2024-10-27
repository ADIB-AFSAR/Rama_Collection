// routes/wishlistRoutes.js
const express = require('express');
const router = express.Router();
const {getWishlist , addToWishlist , removeFromWishlist} = require('../../controller/front/wishlist.controller');

// Define routes
router.get('/:id',getWishlist); // Get all wishlist items
router.post('/',addToWishlist); // Add an item to the wishlist
router.delete('/:userId/:productId',removeFromWishlist); // Remove an item from the wishlist

module.exports = router;