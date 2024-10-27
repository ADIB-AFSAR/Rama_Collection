// api.js
import axios from 'axios';
 

// Function to get all items in the wishlist
export const getWishlistAPI = async (payload) => {
    console.log("Service : ",payload)
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/wishlist/${payload}`);
        console.log(response.data)
        return response.data; // Return the wishlist items
    } catch (error) {
        throw new Error('Error fetching wishlist: ' + error.message);
    }
};

// Function to add an item to the wishlist
export const addToWishlistAPI = async (item) => {
    // console.log('service:',item)
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/wishlist`, item);
        return response.data; // Return the added item
    } catch (error) {
        throw new Error('Error adding to wishlist: ' + error.message);
    }
};

// Function to remove an item from the wishlist
export const removeFromWishlistAPI = async (id) => {
    console.log('Delete service:',id)
    try {
         await axios.delete(`${process.env.REACT_APP_API_URL}/api/wishlist/${id.userId}/${id.productId}`);
    } catch (error) {
        throw new Error('Error removing from wishlist: ' + error.message);
    }
};