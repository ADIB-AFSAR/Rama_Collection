import {
  GOOGLE_LOGIN_START,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from '../action/googleAuth.action';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case GOOGLE_LOGIN_START:
      return { ...state, loading: true };
    case GOOGLE_LOGIN_SUCCESS:
      return { ...state, loading: false, currentUser: action.payload };
    case GOOGLE_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
