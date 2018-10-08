import { combineReducers } from 'redux';
import { PEOPLE_ACTIONS } from '../actions/peopleActions';

const peopleType = {
    managers: [],
    employees: [],
    allEmployees: [],
}

const supervisors = (state = peopleType, action) => {
    if (action.type === PEOPLE_ACTIONS.SET_MANAGERS) {
        return {...state, managers: action.payload};
    } else if (action.type === PEOPLE_ACTIONS.SET_EMPLOYEES) {
        return {...state, employees: action.payload};
    } else if (action.type === PEOPLE_ACTIONS.SET_ALL_EMPLOYEES) {
        return {...state, allEmployees: action.payload}
    }
    return state;
};

export default combineReducers({
    supervisors,
});