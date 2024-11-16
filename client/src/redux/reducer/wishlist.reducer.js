// redux/reducer/wishlist.reducer.js
import { ADD_TO_WISHLIST_START, ADD_TO_WISHLIST_SUCCESS, GET_WISHLIST_START, GET_WISHLIST_SUCCESS, REMOVE_FROM_WISHLIST_SUCCESS } from '../constant/wishlist.constant';

const initialState = {
    items: [],
    IsLoading: false,
    isUpdated: false, // Add this
};

const wishlistReducer = (state = initialState, action) => {
    console.log("suucess :",action.payload)
    switch (action.type) { 
        case GET_WISHLIST_SUCCESS:
            return {...state, items: action.payload };
        case ADD_TO_WISHLIST_START:
            return { ...state, loading: true };
        case ADD_TO_WISHLIST_SUCCESS:
             return { ...state, loading: false, items: action.payload };
        case REMOVE_FROM_WISHLIST_SUCCESS:
            return { ...state, items: state.items.filter(item => item.id !== action.payload) };
        default:
            return state;
    }
};

export default wishlistReducer;