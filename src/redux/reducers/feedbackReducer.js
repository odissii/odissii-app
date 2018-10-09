import { combineReducers } from 'redux';
import { FEEDBACK_ACTIONS } from '../actions/feedbackActions'; 

const feedbackTypes = {
    currentEmployee: [],
    allFeedbackBySupervisor: [],
    feedbackByAllSupervisors: []
}

const feedback = (state = feedbackTypes, action) => {
   if (action.type === FEEDBACK_ACTIONS.SET_CURRENT_EMPLOYEE_FEEDBACK) {
        return {...state, currentEmployee: action.payload};     
    }  else if (action.type === FEEDBACK_ACTIONS.SET_ALL_FEEDBACK_BY_CURRENT_SUPERVISOR){
        return {...state, allFeedbackBySupervisor: action.payload}; 
    } else if (action.type === FEEDBACK_ACTIONS.SET_ALL_FEEDBACK_BY_MANAGER_SUPERVISORS){
        return {...state, feedbackByAllSupervisors: action.payload}; 
    }
    return state; 
} 

export default combineReducers({
   feedback,
  });