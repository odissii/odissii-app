import { call, put, takeLatest } from 'redux-saga/effects';
import { FOLLOW_UP_ACTIONS } from '../actions/followupActions';
import axios from 'axios';

function* fetchAllPendingFollowup() {
  try {
    const followupResponse = yield call(axios.get, '/api/followup/pending/all');
    yield put({
      type: FOLLOW_UP_ACTIONS.SET_ALL_PENDING_FOLLOWUP,
      payload: followupResponse.data
    });
  } catch(error) {
    console.log('fetchAllSupervisorPendingFollowups error:', error);
  }
}

function* fetchEmployeePendingFollowup(action) {
  try {
    const employeeId = action.payload;
    const followupResponse = yield call(axios.get, `/api/followup/pending/employee/${employeeId}`);
    yield put({
      type: FOLLOW_UP_ACTIONS.SET_EMPLOYEE_PENDING_FOLLOWUP,
      payload: followupResponse.data
    });
  } catch(error) {
    console.log('fetchEmployeePendingFollowup error:', error);
  }
}

// the id of the employee and the follow up date need to passed as the payload to this action
function* addFollowup(action) {
  try {
    console.log('addFollowup saga:', action);
    const data = action.payload;
    const postResponse = yield call(axios.post, '/api/followup', data);
    const postedFollowup = postResponse.data;
    yield put({
      type: FOLLOW_UP_ACTIONS.FOLLOWUP_POST_SUCCESS,
      payload: postedFollowup
    });
  } catch(error) {
    console.log('addFollowup error:', error);
  }
}

// the id of the followup needs to be passed as the payload to this action
function* completeFollowup(action) {
  try {
    const followupId = action.payload;
    yield call(axios.put, `/api/followup/${followupId}/complete`);
    // anything to refresh after this call? what?
  } catch(error) {
    console.log('completeFollowup error:', error);
  }
}

function* followupSaga() {
  yield takeLatest(FOLLOW_UP_ACTIONS.FETCH_ALL_PENDING_FOLLOWUP, fetchAllPendingFollowup);
  yield takeLatest(FOLLOW_UP_ACTIONS.FETCH_EMPLOYEE_PENDING_FOLLOWUP, fetchEmployeePendingFollowup);
  yield takeLatest(FOLLOW_UP_ACTIONS.ADD_FOLLOWUP, addFollowup);
  yield takeLatest(FOLLOW_UP_ACTIONS.COMPLETE_FOLLOWUP, completeFollowup);
}

export default followupSaga;