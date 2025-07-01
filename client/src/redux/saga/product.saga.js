import { takeLatest, put } from 'redux-saga/effects';
import { 
    ADD_PRODUCT_START, 
    DELETE_PRODUCT_START, 
    GET_PRODUCT_START, 
    UPDATE_PRODUCT_START 
} from "../constant/product.constant";
import { 
    addProductToAPI, 
    deleteProductFromAPI, 
    getProductFromAPI, 
    updateProductFromAPI 
} from '../service/product.service';
import { 
    addProductError, 
    deleteProductError, 
    getProductError, 
    getProductStart, 
    getProductSuccess, 
    updateProductError 
} from '../action/product.action';

// Saga to get products
function* getProduct() {
    try {
        const data = yield getProductFromAPI();

        if (data) {
            yield put(getProductSuccess(data));
        } else {
            yield put(getProductError("No data received from API"));
        }
    } catch (error) {
        yield put(getProductError(error.message));
    }
}

// Saga to add a product
function* addProduct({ payload }) {
    try {
        yield addProductToAPI(payload); // Make sure to yield this call
        yield put(getProductStart()); // Refresh product list after adding
    } catch (error) {
        yield put(addProductError(error.message));
    }
}

// Saga to delete a product
function* deleteProduct({ payload }) {
    try {
        yield deleteProductFromAPI(payload); // Yield the API call
        yield put(getProductStart()); // Refresh product list after deletion
    } catch (error) {
        yield put(deleteProductError(error.message));
    }
}

// Saga to update a product
function* updateProduct({ payload }) {
    try {
        yield updateProductFromAPI(payload); // Yield the API call
        yield put(getProductStart()); // Refresh product list after update
    } catch (error) {
        yield put(updateProductError(error.message));
    }
}

// Root saga for product actions
export default function* product() {
    yield takeLatest(GET_PRODUCT_START, getProduct);
    yield takeLatest(ADD_PRODUCT_START, addProduct);
    yield takeLatest(DELETE_PRODUCT_START, deleteProduct);
    yield takeLatest(UPDATE_PRODUCT_START, updateProduct);
}
