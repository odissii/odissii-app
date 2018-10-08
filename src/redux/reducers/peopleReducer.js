import { combineReducers } from 'redux';
import { PEOPLE_ACTIONS } from '../actions/peopleActions';

const peopleType = {
    managers: [],
    managerEmployees: [],
    allEmployees: [],
}

const staff = (state = peopleType, action) => {
    if (action.type === PEOPLE_ACTIONS.SET_MANAGERS) {
        return {...state, managers: action.payload};
    } else if (action.type === PEOPLE_ACTIONS.SET_MANAGER_EMPLOYEES) {
        return {...state, employees: action.payload};
    } else if (action.type === PEOPLE_ACTIONS.SET_ALL_EMPLOYEES) {
        return {...state, allEmployees: action.payload}
    }
    return state;
};

export default combineReducers({
    staff,
});