import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import employeeSaga from './employeeSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    employeeSaga(),
    // watchIncrementAsync()
  ]);
}
