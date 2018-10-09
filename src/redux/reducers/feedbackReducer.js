import { combineReducers } from 'redux';
import { FEEDBACK_ACTIONS } from '../actions/feedbackActions'; 

const feedbackTypes = {
    currentEmployee: [],
    allManagerFeedback: [],
    supervisorTotalManagerFeedback: []
}

const feedback = (state = feedbackTypes, action) => {
   if (action.type === FEEDBACK_ACTIONS.SET_CURRENT_EMPLOYEE_FEEDBACK) {
        return {...state, currentEmployee: action.payload};     
    }  else if (action.type === FEEDBACK_ACTIONS.SET_ALL_FEEDBACK_FOR_CURRENT_MANAGER){
        return {...state, allManagerFeedback: action.payload}; 
    } else if (action.type === FEEDBACK_ACTIONS.SET_ALL_MANAGERS_FEEDBACK_FOR_CURRENT_SUPERVISOR){
        return {...state, supervisorTotalManagerFeedback: action.payload}; 
    }
    return state; 
} 

export default combineReducers({
   feedback,
  });