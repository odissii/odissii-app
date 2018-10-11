import React from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FEEDBACK_ACTIONS } from '../../redux/actions/feedbackActions';
import { FOLLOW_UP_ACTIONS } from '../../redux/actions/followupActions';
import { USER_ROLES, employees } from '../../constants';

const mapStateToProps = state => ({
  user: state.user,
  newPostedFeedback: state.feedback.newPostedFeedback,
});

class FeedbackFormConfirmationView extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  
  componentDidUpdate() {
    const {user, history, newPostedFeedback} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('/home');
    } else if (!user.isLoading && user.userName && user.role !== USER_ROLES.SUPERVISOR) {
      history.push('/dashboard');
    } else if (!newPostedFeedback) {
      history.push('/dashboard');
    }
  }

  handleClick = () => {
    this.props.dispatch({
      type: FEEDBACK_ACTIONS.FEEDBACK_CONFIRMATION_ACKWNOLEDGED
    });
    this.props.history.push('/dashboard');
  };

  render() {
    const feedback = this.props.newPostedFeedback;
    const employee = employees.find(employee => employee.id === feedback.employee_id);
    
    return (
      <div>
        confirmation view
        <div>
          Employee: {JSON.stringify(employee)}
        </div>
        <div>
          Feedback: {JSON.stringify(feedback)}
        </div>
        <button onClick={this.handleClick}>Okay</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackFormConfirmationView);