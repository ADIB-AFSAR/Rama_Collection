import { call, put, takeLatest } from 'redux-saga/effects';

function* uploadImageSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

    const cloudRes = yield call(() =>
      fetch('https://api.cloudinary.com/v1_1/dssga1s2j/image/upload', {
        method: 'POST',
        body: formData,
      })
    );

    const cloudData = yield cloudRes.json();

    yield call(() =>
      fetch('/api/carousel/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: cloudData.secure_url,
          device: payload.device,
          type: payload.type,
        }),
      })
    );

    yield put({ type: 'UPLOAD_CAROUSEL_IMAGE_SUCCESS' });
  } catch (err) {
    yield put({ type: 'UPLOAD_CAROUSEL_IMAGE_FAILED', error: err });
  }
}

function* carouselSaga() {
  yield takeLatest('UPLOAD_CAROUSEL_IMAGE', uploadImageSaga);
}

export default carouselSaga;