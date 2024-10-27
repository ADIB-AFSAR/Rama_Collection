import { ADD_CART_ERROR, ADD_CART_START, ADD_CART_SUCCESS, DELETE_CART_ERROR, DELETE_CART_START, DELETE_CART_SUCCESS, GET_CART_ERROR, GET_CART_START, GET_CART_SUCCESS, UPDATE_CART_ERROR, UPDATE_CART_START, UPDATE_CART_SUCCESS } from "../constant/cart.constant";

export const addCartStart = (cart)=>({
    type : ADD_CART_START,
    payload : cart
})
export const addCartSuccess = (cart)=>({
    type : ADD_CART_SUCCESS,
    payload : cart
})
export const addCartError = (error)=>({
    type : ADD_CART_ERROR,
    payload : error
})


export const getCartStart = (cart)=>({
    type : GET_CART_START,
    payload : cart
})
export const getCartSuccess = (cart)=>({
    type : GET_CART_SUCCESS,
    payload : cart
})
export const getCartError = (error)=>({
    type : GET_CART_ERROR,
    payload : error
})


export const deleteCartStart = (cart)=>({
    type :  DELETE_CART_START,
    payload : cart
})
export const deleteCartSuccess = (cart)=>({
    type : DELETE_CART_SUCCESS,
    payload : cart
})
export const deleteCartError = (error)=>({
    type : DELETE_CART_ERROR,
    payload : error
})

export const updateCartStart = (payload)=>({
    type : UPDATE_CART_START,
    payload : payload
})
export const updateCartSuccess = (cart)=>({
    type : UPDATE_CART_SUCCESS,
    payload : cart
})
export const updateCartError = (error)=>({
    type : UPDATE_CART_ERROR,
    payload : error
})


 