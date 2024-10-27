import { ADD_USER_ERROR, ADD_USER_START, ADD_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_START, DELETE_USER_SUCCESS, GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_START, LOGOUT_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_START, REGISTER_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_START, UPDATE_USER_SUCCESS } from "../constant/user.constant";

export const addUserStart = (user)=>({
    type : ADD_USER_START,
    payload : user
})
export const addUserSuccess = (user)=>({
    type : ADD_USER_SUCCESS,
    payload : user
})
export const addUserError = (error)=>({
    type : ADD_USER_ERROR,
    payload : error
})


export const getUserStart = (user)=>({
    type : GET_USER_START,
    payload : user
})
export const getUserSuccess = (user)=>({
    type : GET_USER_SUCCESS,
    payload : user
})
export const getUserError = (error)=>({
    type : GET_USER_ERROR,
    payload : error
})


export const deleteUserStart = (user)=>({
    type :  DELETE_USER_START,
    payload : user
})
export const deleteUserSuccess = (user)=>({
    type : DELETE_USER_SUCCESS,
    payload : user
})
export const deleteUserError = (error)=>({
    type : DELETE_USER_ERROR,
    payload : error
})

export const updateUserStart = (payload)=>({
    type : UPDATE_USER_START,
    payload : payload
})
export const updateUserSuccess = (user)=>({
    type : UPDATE_USER_SUCCESS,
    payload : user
})
export const updateUserError = (error)=>({
    type : UPDATE_USER_ERROR,
    payload : error
})


export const loginUserStart = (login)=>({
    type : LOGIN_USER_START,
    payload : login
})
export const loginUserSuccess = (login)=>({
    type :  LOGIN_USER_SUCCESS,
    payload : login
})
export const loginUserError = (error)=>({
    type : LOGIN_USER_ERROR,
    payload : error
})

export const logoutUserStart = ()=>({
    type : LOGOUT_USER_START
})
export const logoutUserSuccess = ()=>({
    type :  LOGOUT_USER_SUCCESS

})
export const logoutUserError = ()=>({
    type : LOGOUT_USER_ERROR
})

export const registerUserStart = (user)=>({
    type : REGISTER_USER_START,
    payload : user
})
export const registerUserSuccess = (user)=>({
    type : REGISTER_USER_SUCCESS,
    payload : user
})
export const registerUserError = (error)=>({
    type : REGISTER_USER_ERROR,
    payload : error
})