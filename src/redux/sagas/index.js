import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import employeeSaga from './employeeSaga';
import supervisorSaga from './supervisorSaga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    employeeSaga(),
    supervisorSaga(),
    // watchIncrementAsync()
  ]);
}
