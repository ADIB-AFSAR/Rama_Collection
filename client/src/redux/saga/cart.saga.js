import { takeLatest, put } from 'redux-saga/effects';
import { 
    ADD_CART_START, 
    DELETE_CART_START, 
    GET_CART_START, 
    UPDATE_CART_START 
} from "../constant/cart.constant";
import { 
    addCartToAPI, 
    deleteCartItemFromAPI, 
    getCartFromAPI, 
    updateCartToApi 
} from '../service/cart.service';
import { 
    addCartError, 
    deleteCartError, 
    getCartError, 
    getCartStart, 
    getCartSuccess, 
    updateCartError 
} from '../action/cart.action';

// Saga to get cart items
function* getCart() {
    try {
        const data = yield getCartFromAPI();
        yield put(getCartSuccess(data));
    } catch (error) {
        yield put(getCartError(error.message));
    }
}

// Saga to add an item to the cart
function* addCart({ payload }) {
    try {
        yield addCartToAPI(payload);
        yield put(getCartStart()); // Refresh cart after adding an item
    } catch (error) {
        yield put(addCartError(error.message));
    }
}

// Saga to update an item in the cart
function* updateCart({ payload }) {
    try {
        yield updateCartToApi(payload);
        yield put(getCartStart()); // Refresh cart after updating
    } catch (error) {
        yield put(updateCartError(error.message));
    }
}

// Saga to delete an item from the cart
function* deleteCartItem({ payload }) {
    try {
        yield deleteCartItemFromAPI(payload); // Make sure to yield this call
        yield put(getCartStart()); // Refresh cart after deletion
    } catch (error) {
        yield put(deleteCartError(error.message));
    }
}

// Root saga for cart actions
export default function* cartSaga() {
    yield takeLatest(GET_CART_START, getCart);
    yield takeLatest(ADD_CART_START, addCart);
    yield takeLatest(UPDATE_CART_START, updateCart);
    yield takeLatest(DELETE_CART_START, deleteCartItem);
}
