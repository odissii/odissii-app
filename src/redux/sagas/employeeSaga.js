import { put, takeLatest } from 'redux-saga/effects';
import { PEOPLE_ACTIONS } from '../actions/peopleActions';
import axios from 'axios'; 

// will be called to fetch all employees that a manager supervisors
function* fetchEmployees(){
    try {
        const employeeResponse = yield call(axios.get, '/api/staff/employees');
        const responseAction = {type: PEOPLE_ACTIONS.SET_MANAGER_EMPLOYEES, payload: employeeResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get employees', error); 
    }
}

//will be called to fetch all employees in the database
function* fetchAllEmployees(){
    try {
        const allEmployeeResponse = yield call(axios.get, '/api/staff/allEmployees');
        const responseAction = {type: PEOPLE_ACTIONS.SET_ALL_EMPLOYEES, payload: allEmployeeResponse.data};
        yield put(responseAction);
    } catch(error){
        console.log('Cannot get all employees', error);
    }
}

//will be called to add a new employee & then it'll fetch all the employees
function* addEmployee(action){
    try {
        yield call(axios.post, '/api/staff/employee', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES});
    } catch(error){
        console.log('Cannot add new employee', error);  
    }
}

//will be called to delete an employee & then it'll fetch all the employees
function* deleteEmployee(action){
    try {
        yield call(axios.delete, '/api/staff/employee', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES});
    } catch(error){
        console.log('Cannot delete employee', error);
    }
}

//will be called to updated an employee & then it'll fetch all the employees
function* updateEmployee(action){
    try {
        yield call(axios.put, '/api/staff/employee', action.payload);
        yield put({type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES});
    } catch(error){
        console.log('Cannot update employee', error);
    }
}

function* employeeSaga(){
    yield takeLatest(PEOPLE_ACTIONS.FETCH_EMPLOYEES, fetchEmployees);
    yield takeLatest(PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES, fetchAllEmployees);
    yield takeLatest(PEOPLE_ACTIONS.ADD_EMPLOYEE, addEmployee);
    yield takeLatest(PEOPLE_ACTIONS.DELETE_EMPLOYEE, deleteEmployee);
    yield takeLatest(PEOPLE_ACTIONS.UPDATE_EMPLOYEE, updateEmployee);
}
export default employeeSaga; 