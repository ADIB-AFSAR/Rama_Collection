import { GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS } from "../constant/product.constant";

// Initial state with products loaded from local storage or set to an empty array
const initialState = {
    products: localStorage.getItem('products') 
        ? JSON.parse(localStorage.getItem('products')) 
        : [], // Fallback to an empty array if not found
    error: null, // Initialize error state
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SUCCESS:
            // Update local storage with new products and return updated state
            localStorage.setItem('products', JSON.stringify(action.payload));
            return {
                ...state,
                products: [...action.payload], // Spread to create a new array
                error: null, // Clear any existing errors on success
            };
        case GET_PRODUCT_ERROR:
            // Handle error and update state
            return {
                ...state,
                error: action.payload, // Set error details
            };
        default:
            // Return the current state for unrecognized actions
            return state;
    }
};
