import { GET_CART_ERROR, GET_CART_SUCCESS } from "../constant/cart.constant";

// Default value for the cart
export const defaultValue = {
    customer: '',
    items: [],
    subTotal: 0,
    tax: 0,
    grandTotal: 0,
};

// Load the previous cart from local storage or set to default value if not found
const previousCart = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : defaultValue;

// Initial state with current cart and error handling
const initialState = {
    currentCart: previousCart, // Load previous cart if available
    error: null, // Initialize error state
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_SUCCESS:
            // Update local storage and return new state with updated cart
            localStorage.setItem('cart', JSON.stringify(action.payload));
            return {
                ...state,
                currentCart: { ...action.payload }, // Spread to ensure a new object reference
                error: null, // Clear any existing errors on success
            };
        case GET_CART_ERROR:
            // Handle errors and update state
            return {
                ...state,
                error: action.payload, // Set error details
            };
        default:
            // Return the current state for unrecognized actions
            return state;
    }
};
