// controllers/wishlistController.js
const Wishlist = require('../../models/wishlist.model'); // Import the model

// Get all wishlist items for a specific user
exports.getWishlist = async (req, res) => {
    const userId = req.params.id; // Get user ID from request parameters
    console.log(userId)
    try {
        const items = await Wishlist.find({ userId }).populate('productId'); // Fetch items for the user and populate product details
        res.status(200).json(items); // Send response
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving wishlist items' });
    }
};

// Add an item to the wishlist
exports.addToWishlist = async (req, res) => {
    const { userId, productId } = req.body; // Get user ID and product ID from request body
    const newItem = new Wishlist({ userId, productId }); // Create a new wishlist item
    try {
        const savedItem = await newItem.save(); // Save to the database
        res.status(201).json(savedItem); // Send response
    } catch (error) {
        console.error("Error details:", error); // Log the error details
        res.status(400).json({ message: 'Error adding item to wishlist'});
    }
};


// Remove an item from the wishlist
exports.removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.params; // Get user ID and product ID from request parameters
    console.log(userId, productId)
    try {
        await Wishlist.findOneAndDelete({ userId, productId }); // Delete item by user ID and product ID
        res.json({
            statusCode : 201,
            message : 'Item removed successfully'
        })
         
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from wishlist' });
    }
};