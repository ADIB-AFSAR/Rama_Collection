import { takeLatest, put, call } from 'redux-saga/effects';
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
    placeOrderError, 
    placeOrderSuccess
} from '../action/order.action';
import { getCartStart } from '../action/cart.action';
import { toast } from 'react-toastify';
import axios from 'axios';

// Saga to get all orders
function* getOrder() {
    try {
        const data = yield getOrderFromAPI();
        yield put(getOrderSuccess(data));
    } catch (error) {
        yield put(getOrderError(error.message));
    }
}

function* getAllOrders() {
  try {
    const res = yield call(() => axios.get('/api/admin/order'));
    yield put(getOrderSuccess(res.data.order));
  } catch (err) {
    yield put(getOrderError(err.message));
  }
}


function* getUserOrders(action) {
  try {
    const res = yield call(() => axios.post('/api/order/user', { userId: action.payload }));
    yield put(getOrderSuccess(res.data.order));
  } catch (err) {
    yield put(getOrderError(err.message));
  }
}


// Saga to place an order
 function* placeOrder(action) {
    try {
    const { billingAddress, cartId, device } = action.payload;

    const res = yield call(placeOrderToAPI, cartId, billingAddress , device);
    
console.log("API Response:", res); // 👈 ADD THIS

      if (res  && res.success){
      const order = res.order;

      localStorage.setItem("orderPlacedOnce", "1");   
      toast.success("Order placed successfully!");

      // Refresh cart and order list
      yield put(getCartStart());
      yield put(getOrderStart());
      
      yield put(placeOrderSuccess({order,device}));
    } else {
      yield put(placeOrderError(res.data.message || "Order failed"));
      toast.error("Something went wrong while placing the order.");
    }
  } catch (error) {
    yield put(placeOrderError(error.message || "Order error"));
    console.error("Place order error:", error);
    toast.error("Something went wrong while placing the order.");
  }
}

// Root saga for order actions
export default function* orderSaga() {
    yield takeLatest(GET_ORDER_START, getOrder);
    yield takeLatest(PLACE_ORDER_START, placeOrder);
    yield takeLatest("GET_ALL_ORDERS_START", getAllOrders);
    yield takeLatest("GET_USER_ORDERS_START", getUserOrders);
}
