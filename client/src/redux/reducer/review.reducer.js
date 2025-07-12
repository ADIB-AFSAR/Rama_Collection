import { ADD_REVIEW_FAILURE, ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, FETCH_REVIEWS_FAILURE, FETCH_REVIEWS_REQUEST, FETCH_REVIEWS_SUCCESS } from "../constant/review.constant";

 
const initialState = {
  reviewsByProduct: {}, // key: productId, value: array of reviews
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_REQUEST:
    case ADD_REVIEW_REQUEST:
      return { ...state, loading: true };

    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviewsByProduct: {
          ...state.reviewsByProduct,
          [action.payload.productId]: action.payload.reviews,
        },
      };

    case ADD_REVIEW_SUCCESS:
      const addedReview = action.payload;
      const prev = state.reviewsByProduct[addedReview.productId] || [];
      return {
        ...state,
        loading: false,
        reviewsByProduct: {
          ...state.reviewsByProduct,
          [addedReview.productId]: [addedReview, ...prev],
        },
      };

    case FETCH_REVIEWS_FAILURE:
    case ADD_REVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default reviewReducer;
