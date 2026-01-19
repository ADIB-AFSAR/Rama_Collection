import { takeLatest, put, call } from 'redux-saga/effects';
import {toast} from "react-toastify"
import { 
    ADD_USER_START, 
    DELETE_USER_START, 
    GET_USER_START, 
    LOGIN_USER_START, 
    LOGOUT_USER_START, 
    REGISTER_USER_START, 
    UPDATE_USER_START 
} from "../constant/user.constant";
import { 
    addUserToAPI, 
    deleteUserFromAPI, 
    getUserFromAPI, 
    loginUserToAPI, 
    registerUserToAPI, 
    updateUserFromAPI 
} from '../service/user.service';
import { 
    addUserError, 
    deleteUserError, 
    getUserError, 
    getUserStart, 
    getUserSuccess, 
    loginUserError, 
    loginUserSuccess, 
    logoutUserError, 
    logoutUserSuccess, 
    registerUserError,  
    registerUserSuccess, 
    updateUserError 
} from '../action/user.acton';

function* getUser() {
    try {
        const data = yield call(getUserFromAPI);
        yield put(getUserSuccess(data));
        
    } catch (error) {
        yield put(getUserError(error.message));
        
    }
}

function* addUser({ payload }) {
    try {
        yield call(addUserToAPI, payload);
        yield put(getUserStart());
        toast.success("User added manually - successfull")
    } catch (error) {
        yield put(addUserError(error.message));
        toast.success(error.message)
    }
}

function* deleteUser({ payload }) {
    try {
        yield call(deleteUserFromAPI, payload);
        toast.success("User deleted successfully")
    } catch (error) {
        yield put(deleteUserError(error.message));
        toast.success(error.message)

    }
}

function* updateUser({ payload }) {
    try {
        yield call(updateUserFromAPI, payload);
        yield put(getUserStart());
        // yield put(loginUserSuccess(payload)); 
        toast.success("User profile updated successfully")
    } catch (error) {
        yield put(updateUserError(error.message));
        toast.error(error.message)
    }
}

function* loginUser({ payload }) {
    try {
        const response = yield call(loginUserToAPI, payload);
        yield put(loginUserSuccess(response.user));
        toast.success("Logged in successfully")
    } catch (error) {
    const errorMsg = error?.message || "Something went wrong";

    yield put(loginUserError(errorMsg));
    toast.error(errorMsg);
  }
}

function* logoutUser() {
    try {
        yield put(logoutUserSuccess());
        toast.success("Logged out successfully")
    } catch (error) {
        yield put(logoutUserError(error.message));
        toast.error(error.message)
    }
}

function* registerUser({ payload }) {
     const { onSuccess, onError, ...userData } = payload;
    try {
        const res = yield call(registerUserToAPI, userData);
        if (res.response.status === 409) {
      yield put(registerUserError("User already exists."));
      toast.error("User email already exists.");
    } else {
      const data = res.data.message; // get JSON body

      if (data === "User registered successfully.") {
      yield put(registerUserSuccess(data));
      toast.success(data);

      if (onSuccess) onSuccess(); // Call the success callback (e.g., redirect)
    } else {
      const msg = data || "Registration failed.";
      yield put(registerUserError(msg));
      toast.error(msg);
      if (onError) onError(msg);
    }
    }
    } catch (error) {
    const errorMsg = "Something went wrong, please try again.";
    yield put(registerUserError(errorMsg));
    toast.error(errorMsg);
    if (onError) onError(errorMsg);  
     }
    }

export default function* user() {
    yield takeLatest(GET_USER_START, getUser);
    yield takeLatest(ADD_USER_START, addUser);
    yield takeLatest(DELETE_USER_START, deleteUser);
    yield takeLatest(UPDATE_USER_START, updateUser);
    yield takeLatest(LOGIN_USER_START, loginUser);
    yield takeLatest(LOGOUT_USER_START, logoutUser);
    yield takeLatest(REGISTER_USER_START, registerUser);
}
