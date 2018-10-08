import { put, takeLatest } from 'redux-saga/effects';
import { PEOPLE_ACTIONS } from '../actions/peopleActions';
import axios from 'axios'; 

// will be called to fetch all managers 
function* fetchManagers(){
    try{
        const managerResponse = yield call(axios.get, '/api/staff/managers');
        const responseAction = {type: PEOPLE_ACTIONS.SET_MANAGERS, payload: managerResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get managers', error); 
    }
}
//will be called to add a new manager & then it'll fetch all the managers
function* addManager(action){
    try {
        yield call(axios.post, '/api/staff/manager', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_MANAGERS});
    } catch(error){
        console.log('Cannot add new manager', error);  
    }
}
//will be called to delete a manager & then it'll fetch all the managers
function* deleteManager(action){
    try {
        yield call(axios.delete, '/api/staff/manager', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_MANAGERS});
    } catch(error){
        console.log('Cannot delete employee', error);
    }
}

//will be called to updated a manager & then it'll fetch all the managers
function* updateManager(action){
    try {
        yield call(axios.put, '/api/staff/manager', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_MANAGERS});
    } catch(error){
        console.log('Cannot update employee', error);
    }
}

function* managerSaga(){
    yield takeLatest(PEOPLE_ACTIONS.FETCH_MANAGERS, fetchManagers);
    yield takeLatest(PEOPLE_ACTIONS.ADD_MANAGER, addManager);
    yield takeLatest(PEOPLE_ACTIONS.DELETE_MANAGER, deleteManager);
    yield takeLatest(PEOPLE_ACTIONS.UPDATE_MANAGER, updateManager);
}
export default managerSaga; 