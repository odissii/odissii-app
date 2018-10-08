import { combineReducers } from 'redux';
import { PEOPLE_ACTIONS } from '../actions/peopleActions';

const peopleType = {
    managers: [],
    employees: [],
}

const supervisors = (state = peopleType, action) => {
    if (action.type === PEOPLE_ACTIONS.SET_MANAGERS) {
        return {...state, managers: action.payload};
    } else if (action.type === PEOPLE_ACTIONS.SET_EMPLOYEE) {
        return {...state, employees: action.payload};
    } return state;
};

const managers = (state = [], action) => {
    if (action.type === PEOPLE_ACTIONS.SET_MANAGER_EMPLOYEES) {
        return action.payload;
    } return state;
}

export default combineReducers({
    supervisors,
    managers
});