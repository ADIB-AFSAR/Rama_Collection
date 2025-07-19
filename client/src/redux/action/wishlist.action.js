// redux/action/wishlist.actions.js
import { ADD_TO_WISHLIST_START, ADD_TO_WISHLIST_SUCCESS, GET_WISHLIST_START, REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_TO_WISHLIST_START } from '../constant/wishlist.constant';


export const getWishListStart = (id)=>{
     return {
        type: GET_WISHLIST_START,
        payload: id,
    };
}
export const getWishlistSuccess = (product) => {
    return {
        type: ADD_TO_WISHLIST_SUCCESS,
        payload: product,
    };
};
export const addToWishlistStart = (product) => {
     return {
        type: ADD_TO_WISHLIST_START,
        payload: product,
    };
};

export const addToWishlistSuccess = (product) => {
    return {
        type: ADD_TO_WISHLIST_SUCCESS,
        payload: product,
    };
};

export const removeFromWishlistStart = (productId) => {
    return {
        type: REMOVE_TO_WISHLIST_START,
        payload: productId,
    };
};

export const removeFromWishlistSuccess = (productId) => {
    return {
        type: REMOVE_FROM_WISHLIST_SUCCESS,
        payload: productId,
    };
};