import React from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FEEDBACK_ACTIONS } from '../../redux/actions/feedbackActions';
import { USER_ROLES, employees } from '../../constants';

const mapStateToProps = state => ({
  user: state.user,
  confirmationDisplayed: state.feedback.confirmationDisplayed,
  newPostedFeedback: state.feedback.newPostedFeedback,
  newPostedFollowup: state.followup.newPostedFollowup,
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
    this.props.history.push('/dashboard');
  };

  componentWillUnmount() {
    this.props.dispatch({
      type: FEEDBACK_ACTIONS.FEEDBACK_CONFIRMATION_ACKWNOLEDGED
    });
  }

  render() {
    if (this.props.confirmationDisplayed) {
      
      const feedback = this.props.newPostedFeedback;
      const followup = this.props.newPostedFollowup;
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
          <div>
            Followup: {JSON.stringify(followup)}
          </div>
          <button onClick={this.handleClick}>Okay</button>
        </div>
      );
    } else {
      this.props.history.push('/dashboard');
      return null;
    }
  }
}

export default connect(mapStateToProps)(FeedbackFormConfirmationView);