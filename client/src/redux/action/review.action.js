import { ADD_REVIEW_REQUEST, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS } from "../constant/review.constant";

 
export const fetchReviewsRequest = (productId) => ({
  type: FETCH_REVIEWS_REQUEST,
  payload: productId,
});

export const fetchReviewsSuccess = (productId) => ({
  type: FETCH_REVIEWS_SUCCESS,
  payload: productId,
});

export const fetchReviewsError = (productId) => ({
  type: FETCH_REVIEWS_FAILURE,
  payload: productId,
});

export const addReviewRequest = (reviewData) => ({
  type: ADD_REVIEW_REQUEST,
  payload: reviewData,
});
