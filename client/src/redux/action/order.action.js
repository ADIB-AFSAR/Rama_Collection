import { GET_ORDER_ERROR, GET_ORDER_START, GET_ORDER_SUCCESS, PLACE_ORDER_ERROR, PLACE_ORDER_START, PLACE_ORDER_SUCCESS } from "../constant/order.constant";

export const placeOrderStart = (order)=>({
    type :  PLACE_ORDER_START,
    payload : order
})
export const placeOrderSuccess = (order)=>({
    type : PLACE_ORDER_SUCCESS,
    payload : order
})
export const placeOrderError = (error)=>({
    type : PLACE_ORDER_ERROR,
    payload : error
})


export const getOrderStart = (order)=>({
    type : GET_ORDER_START,
    payload : order
})
export const getOrderSuccess = (order)=>({
    type : GET_ORDER_SUCCESS,
    payload : order
})
export const getOrderError = (error)=>({
    type : GET_ORDER_ERROR,
    payload : error
})


 


 