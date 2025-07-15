import { call, takeLatest, put } from 'redux-saga/effects';
import {
  GOOGLE_LOGIN_START,
  googleLoginSuccess,
  googleLoginFailure,
} from '../action/googleAuth.action';
import { loginGoogleAPI } from '../service/user.service';
 
function* googleLoginSaga({ payload }) {
  try {
    const response = yield call(() =>
      fetch(`${process.env.REACT_APP_API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    );
    const data = yield response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      yield put({ type: "LOGIN_SUCCESS", payload: data.user });
    } else {
      yield put({ type: "LOGIN_FAILURE", payload: data.message });
    }
  } catch (error) {
    yield put({ type: "LOGIN_FAILURE", payload: error.message });
  }
}



export default function* authSaga() {
  yield takeLatest(GOOGLE_LOGIN_START, googleLoginSaga);
}
