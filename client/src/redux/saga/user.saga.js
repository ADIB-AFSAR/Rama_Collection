import { takeLatest, put, call } from 'redux-saga/effects';
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
    registerUserStart, 
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
    } catch (error) {
        yield put(addUserError(error.message));
    }
}

function* deleteUser({ payload }) {
    try {
        yield call(deleteUserFromAPI, payload);
    } catch (error) {
        yield put(deleteUserError(error.message));
    }
}

function* updateUser({ payload }) {
    try {
        yield call(updateUserFromAPI, payload);
        yield put(getUserStart());
        yield put(loginUserSuccess(payload)); // Optional: consider whether this is desired behavior
    } catch (error) {
        yield put(updateUserError(error.message));
    }
}

function* loginUser({ payload }) {
    try {
        const response = yield call(loginUserToAPI, payload);
        yield put(loginUserSuccess(response.user));
    } catch (error) {
        yield put(loginUserError(error.message));
    }
}

function* logoutUser() {
    try {
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserError(error.message));
    }
}

function* registerUser({ payload }) {
    console.log("saga:", payload)
    try {
        yield put(registerUserToAPI(payload))
        yield put(registerUserStart())
        yield put(getUserStart())
    } catch (error) {
        yield put(registerUserError(error.message))
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
