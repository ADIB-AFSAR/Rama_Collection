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
    if (!Array.isArray(action.payload)) {
        return state; // Don’t update state with invalid payload
    }
    localStorage.setItem('products', JSON.stringify(action.payload));
    return {
        ...state,
        products: [...action.payload],
        error: null,
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
