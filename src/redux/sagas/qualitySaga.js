import { call, put, takeLatest } from 'redux-saga/effects';
import { QUALITY_ACTIONS } from '../actions/qualityActions';
import axios from 'axios';

// FETCH_FEEDBACK_QUALITY_CATEGORIES: 'FETCH_FEEDBACK_QUALITY_CATEGORIES',
//   SET_FEEDBACK_QUALITY_CATEGORIES: 'SET_FEEDBACK_QUALITY_CATEGORIES'
function* fetchFeedbackQualityCategories() {
  try {
    const qualitiesResponse = yield call(axios.get, '/api/quality');
    yield put({
      type: QUALITY_ACTIONS.SET_FEEDBACK_QUALITY_CATEGORIES,
      payload: qualitiesResponse.data
    });
  } catch(error) {
    console.log('Cannot get feedback qualities:', error);
  }
}

function* qualitySaga() {
  yield takeLatest(QUALITY_ACTIONS.FETCH_FEEDBACK_QUALITY_CATEGORIES, fetchFeedbackQualityCategories);
}

export default qualitySaga;