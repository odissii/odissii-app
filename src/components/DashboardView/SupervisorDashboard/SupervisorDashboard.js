import React from 'react';
import { connect } from 'react-redux';
// import { USER_ACTIONS } from '../../../redux/actions/userActions';

import { Grid } from '@material-ui/core'; 
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import QuarterlySummary from './Graphs/QuarterlySummary';
import PastThreeWeeks from './Graphs/PastThreeWeeks';

const mapStateToProps = state => ({
  user: state.user,
  feedbackHistory: state.feedback.feedback.allFeedbackBySupervisor,
});

class SupervisorDashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: FEEDBACK_ACTIONS.FETCH_ALL_FEEDBACK_BY_CURRENT_SUPERVISOR
    });
  }

  render(){
    const { feedbackHistory } = this.props;
    return (
      <div>
        <h2>Supervisor Dashboard</h2>
        <div>
          Current Quarter
          <QuarterlySummary data={feedbackHistory} />
        </div>
        <div>
          Past Three Weeks
          <PastThreeWeeks data={feedbackHistory}/>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps)(SupervisorDashboard);