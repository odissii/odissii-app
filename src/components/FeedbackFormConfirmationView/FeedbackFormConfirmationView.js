import React from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FEEDBACK_ACTIONS } from '../../redux/actions/feedbackActions';
import { FOLLOW_UP_ACTIONS } from '../../redux/actions/followupActions';

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
    } else if (!user.isLoading && user.userName && user.role !== 'supervisor') {
      history.push('/home');
    } else if (!newPostedFeedback) {
      history.push('/home');
    }
  }

  handleClick = () => {
    this.props.dispatch({
      type: FEEDBACK_ACTIONS.FEEDBACK_CONFIRMATION_ACKWNOLEDGED
    });
    this.props.history.push('/home');
  };

  render() {
    return (
      <div>
        confirmation view
        {JSON.stringify(this.props.newPostedFeedback)}
        <button onClick={this.handleClick}>Okay</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackFormConfirmationView);