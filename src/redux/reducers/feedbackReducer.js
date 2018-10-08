import { combineReducers } from 'redux';

const feedbackTypes = {
    currentEmployee: [],
    allManagerFeedback: [],
    supervisorTotalManagerFeedback: []
}

const feedback = (state = feedbackTypes, action) => {
   if (action.type === 'SET_CURRENT_EMPLOYEE_FEEDBACK') {
        return {...state, currentEmployee: action.payload};     
    }  else if (action.type === 'SET_ALL_FEEDBACK_FOR_CURRENT_MANAGER'){
        return {...state, allManagerFeedback: action.payload}; 
    } else if (action.type === 'SET_ALL_MANAGERS_FEEDBACK_FOR_CURRENT_SUPERVISOR'){
        return {...state, supervisorTotalManagerFeedback: action.payload}; 
    }
    return state; 
} 
const followUpRecords = {
    employeeFollowUp: [],
    allFollowUpRecords: []
}
const followUp = (state = followUpRecords, action) => {
    if (action.type === 'SET_EMPLOYEE_FOLLOWUP_RECORDS'){
        return {...state, employeeFollowUp: action.payload}; 
    } else if (action.type === 'SET_ALL_FOLLOWUP_RECORDS'){
        return {...state, allFollowUpRecords: action.payload}; 
    } return state; 
}

export default combineReducers({
   feedback,
   followUp
  });