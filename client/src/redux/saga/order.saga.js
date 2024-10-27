import { takeLatest, put } from 'redux-saga/effects';
import { 
    GET_ORDER_START, 
    PLACE_ORDER_START 
} from '../constant/order.constant';
import { 
    getOrderFromAPI, 
    placeOrderToAPI 
} from '../service/order.service';
import { 
    getOrderError, 
    getOrderStart, 
    getOrderSuccess, 
    placeOrderError 
} from '../action/order.action';
import { getCartStart } from '../action/cart.action';

// Saga to get orders
function* getOrder() {
    try {
        const data = yield getOrderFromAPI();
        yield put(getOrderSuccess(data));
    } catch (error) {
        yield put(getOrderError(error.message));
    }
}

// Saga to place an order
function* placeOrder({ payload }) {
    try {
        yield placeOrderToAPI(payload); // Make sure to yield this call
        yield put(getOrderStart()); // Refresh order list after placing
        yield put(getCartStart()); // Refresh cart after placing the order
    } catch (error) {
        yield put(placeOrderError(error.message));
    }
}

// Root saga for order actions
export default function* orderSaga() {
    yield takeLatest(GET_ORDER_START, getOrder);
    yield takeLatest(PLACE_ORDER_START, placeOrder);
}
