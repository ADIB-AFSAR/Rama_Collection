import { ADD_REVIEW_REQUEST, FETCH_REVIEWS_REQUEST } from "../constant/review.constant";

 
export const fetchReviewsRequest = (productId) => ({
  type: FETCH_REVIEWS_REQUEST,
  payload: productId,
});

export const addReviewRequest = (reviewData) => ({
  type: ADD_REVIEW_REQUEST,
  payload: reviewData,
});
