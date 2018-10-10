import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import employeeSaga from './employeeSaga';
import supervisorSaga from './supervisorSaga';
import feedbackSaga from './feedbackSaga';
import followupSaga from './followupSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    employeeSaga(),
    supervisorSaga(),
    feedbackSaga(),
    followupSaga(),
    // watchIncrementAsync()
  ]);
}
