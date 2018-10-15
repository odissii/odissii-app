import { QUALITY_ACTIONS } from '../actions/qualityActions';

const quality_types = (state = [], action) => {
  if (action.type === QUALITY_ACTIONS.SET_FEEDBACK_QUALITY_CATEGORIES) {
    return action.payload;
  } else {
    return state;
  }
};

export default quality_types;