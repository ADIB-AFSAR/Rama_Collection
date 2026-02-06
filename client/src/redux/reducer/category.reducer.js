 import { GET_CATEGORY_ERROR, GET_CATEGORY_START, GET_CATEGORY_SUCCESS, GET_CATEGORY_TREE_ERROR, GET_CATEGORY_TREE_START, GET_CATEGORY_TREE_SUCCESS, SET_CATEGORY_TREE_SUCCESS } from "../constant/category.constant";

// Initial state with categories loaded from local storage or set to an empty array
const initialState = {
    categories: localStorage.getItem('categories') 
        ? JSON.parse(localStorage.getItem('categories')) 
        : [], // Fallback to empty array if not found
    error: null, // Initialize error state
    loading : false,
    tree : [] ,
    status : true
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_START:
            return{
                ...state,
                loading :true
            }
        case GET_CATEGORY_SUCCESS:
            // Update local storage with new categories and return updated state
            localStorage.setItem('categories', JSON.stringify(action.payload));
            return {
                ...state,
                categories: [...action.payload], // Spread to create a new array
                error: null, // Clear any existing errors on success
                loading :false
            };
        case GET_CATEGORY_ERROR:
            // Handle error and update state
            return {
                ...state,
                error: action.payload, // Set error details
                loading :false
            };
        case GET_CATEGORY_TREE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CATEGORY_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        tree: action.payload,
      };

    case GET_CATEGORY_TREE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
        default:
            // Return the current state for unrecognized actions
            return state;
    }
};
