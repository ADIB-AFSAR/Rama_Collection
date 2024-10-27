import { ADD_PRODUCT_ERROR, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_START, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_ERROR, GET_PRODUCT_START, GET_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_START, UPDATE_PRODUCT_SUCCESS } from "../constant/product.constant";

export const addProductStart = (payload)=>({
    type : ADD_PRODUCT_START,
    payload : payload
})
export const addProductSuccess = (product)=>({
    type : ADD_PRODUCT_SUCCESS,
    payload : product
})
export const addProductError = (error)=>({
    type : ADD_PRODUCT_ERROR,
    payload : error
})


export const getProductStart = (product)=>({
    type : GET_PRODUCT_START,
    payload : product
})
export const getProductSuccess = (product)=>({
    type : GET_PRODUCT_SUCCESS,
    payload : product
})
export const getProductError = (error)=>({
    type : GET_PRODUCT_ERROR,
    payload : error
})


export const deleteProductStart = (product)=>({
    type :  DELETE_PRODUCT_START,
    payload : product
})
export const deleteProductSuccess = (product)=>({
    type : DELETE_PRODUCT_SUCCESS,
    payload : product
})
export const deleteProductError = (error)=>({
    type : DELETE_PRODUCT_ERROR,
    payload : error
})

export const updateProductStart = (product)=>({
    type : UPDATE_PRODUCT_START,
    payload : product
})
export const updateProductSuccess = (product)=>({
    type : UPDATE_PRODUCT_SUCCESS,
    payload : product
})
export const updateProductError = (error)=>({
    type : UPDATE_PRODUCT_ERROR,
    payload : error
})