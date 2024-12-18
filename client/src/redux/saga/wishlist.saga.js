import { call, put, takeEvery } from 'redux-saga/effects'; 
import { addToWishlistSuccess,  getWishlistSuccess,  removeFromWishlistSuccess } from '../action/wishlist.action';
import { addToWishlistAPI, getWishlistAPI, removeFromWishlistAPI } from '../service/wishlist.service';
import { ADD_TO_WISHLIST_START,  GET_WISHLIST_START,  REMOVE_FROM_WISHLIST_SUCCESS, REMOVE_TO_WISHLIST_START } from '../constant/wishlist.constant';
  

function* getWishListStart({payload}){
    try {
        console.log("Wishlist id in saga:",payload)
        const wishlist = yield getWishlistAPI(payload);
        yield put(getWishlistSuccess(wishlist));
    } catch (error) {
        console.log(error.message);
    }
 
}
// Worker saga to handle adding to wishlist
function* addToWishlist({payload}) {
    console.log("saga:",payload)
    try {
        const product = yield call(addToWishlistAPI,payload);
        yield put(addToWishlistSuccess(product));
        yield put(getWishListStart(payload.userId)); // Refresh product list after update
    } catch (error) {
        console.log(error.message);
    }
}


// Worker saga to handle removing from wishlist
function* removeFromWishlist(action) {
    try {
        yield call(removeFromWishlistAPI, action.payload); // Call your API to remove from wishlist
        yield put(removeFromWishlistSuccess(action.payload)); // Dispatch success action
        yield put(getWishListStart(action.payload.userId)); // Refresh product list after update
    } catch (error) {
        console.log(error.message); // Dispatch failure action
    }
}

// Watcher saga
export function* watchWishlist() {
    yield takeEvery(GET_WISHLIST_START , getWishListStart);
    yield takeEvery(ADD_TO_WISHLIST_START, addToWishlist);
    yield takeEvery(REMOVE_TO_WISHLIST_START, removeFromWishlist);

}