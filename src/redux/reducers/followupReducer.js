import { combineReducers } from 'redux';
import { FOLLOW_UP_ACTIONS } from '../actions/followupActions';
import { FEEDBACK_ACTIONS } from '../actions/feedbackActions';

const newPostedFollowup = (state = null, action) => {
  if (action.type === FOLLOW_UP_ACTIONS.FOLLOWUP_POST_SUCCESS) {
    return action.payload;
  } else if (action.type === FEEDBACK_ACTIONS.FEEDBACK_CONFIRMATION_ACKWNOLEDGED) {
    return null;
  } else {
    return state;
  }
};

export default combineReducers({
  newPostedFollowup,
});