import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_REVIEW_FAILURE, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST } from '../constant/review.constant';
import { fetchReviewsRequest } from '../action/review.action';
import {getToken} from "../service/token.service"

// Fetch reviews
function* fetchReviewsSaga(action) {
const productId = action.payload.productId;
  try {
    const { data } = yield call(axios.get, `${process.env.REACT_APP_API_URL}/api/reviews/${productId}`)
    yield put(fetchReviewsRequest({ productId: action.payload, reviews: data }))
  } catch (error) {
    yield put({ type: FETCH_REVIEWS_FAILURE, payload: error.message });
  }
}

// Add review
function* addReviewSaga(action) {
  try {
    const { data } = yield call(axios.post, `${process.env.REACT_APP_API_URL}/api/reviews`, action.payload,{
  headers: {
    Authorization: getToken(),
  }});
    yield put({ type: ADD_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADD_REVIEW_FAILURE, payload: error.message });
  }
}

export default function* reviewSaga() {
  yield takeLatest(FETCH_REVIEWS_REQUEST, fetchReviewsSaga);
  yield takeLatest(ADD_REVIEW_REQUEST, addReviewSaga);
}
