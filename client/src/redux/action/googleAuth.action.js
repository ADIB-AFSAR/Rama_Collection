export const GOOGLE_LOGIN_START = 'GOOGLE_LOGIN_START';
export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_FAILURE = 'GOOGLE_LOGIN_FAILURE';

export const googleLoginStart = userData => ({
  type: GOOGLE_LOGIN_START,
  payload: userData,
});
export const googleLoginSuccess = data => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: data,
});
export const googleLoginFailure = error => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});

 