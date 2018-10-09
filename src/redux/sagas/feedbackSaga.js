import { put, takeLatest } from 'redux-saga/effects';
import { FEEDBACK_ACTIONS } from '../actions/feedbackActions';
import axios from 'axios';

//will be called to get all of the employee's feedbacks
function* fetchCurrentEmployeeFeedback(){
    try {
        const feedbackResponse = yield call(axios.get, '/api/feedback/employee');
        const responseAction = {type: FEEDBACK_ACTIONS.SET_CURRENT_EMPLOYEE_FEEDBACK, payload: feedbackResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get employee feedback', error);
    }
}
//will be called to get all of the feedback that the manager has given
function* fetchAllManagerFeedback(){
    try {
        const feedbackResponse = yield call(axios.get, '/api/feedback/');
        const responseAction = {type: FEEDBACK_ACTIONS.SET_ALL_FEEDBACK_FOR_CURRENT_MANAGER, payload: feedbackResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get all feedback that manager has given', error);
    }
}
//will be called to get all of the feedback that all managers have given, to be viewed by a supervisor
function* fetchTotalFeedbackForSupervisor(){
    try{
        const feedbackResponse = yield call(axios.get, '/api/feedback/managers/all');
        const responseAction = {type: FEEDBACK_ACTIONS.SET_ALL_MANAGERS_FEEDBACK_FOR_CURRENT_SUPERVISOR, payload: feedbackResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get all feedback for all managers', error);
    }
}
//adds a new feedback record
function* addFeedback(action){
    try{
       yield call(axios.post, '/api/feedback/', action.payload);
       yield put({type: FEEDBACK_ACTIONS.FETCH_ALL_FEEDBACK_FOR_CURRENT_MANAGER}); 
    } catch(error){
        console.log('Cannot add new feedback', error);
    }
}
//updates feedback record
function* updateFeedback(action){
    try{
        yield call(axios.put, '/api/feedback/', action.payload);
        yield put({ type: FEEDBACK_ACTIONS.FETCH_ALL_FEEDBACK_FOR_CURRENT_MANAGER });
    } catch (error) {
        console.log('Cannot edit feedback', error);
    }
}
function* feedbackSaga(){
    yield takeLatest(FEEDBACK_ACTIONS.FETCH_CURRENT_EMPLOYEE_FEEDBACK, fetchCurrentEmployeeFeedback);
    yield takeLatest(FEEDBACK_ACTIONS.FETCH_ALL_FEEDBACK_FOR_CURRENT_MANAGER, fetchAllManagerFeedback);
    yield takeLatest(FEEDBACK_ACTIONS.FETCH_ALL_FEEDBACK_FOR_CURRENT_SUPERVISOR, fetchTotalFeedbackForSupervisor);
    yield takeLatest(FEEDBACK_ACTIONS.ADD_FEEDBACK, addFeedback);
    yield takeLatest(FEEDBACK_ACTIONS.UPDATE_FEEDBACK, updateFeedback);
}

export default feedbackSaga;