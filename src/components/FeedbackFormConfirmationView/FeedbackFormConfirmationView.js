import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FEEDBACK_ACTIONS } from '../../redux/actions/feedbackActions';
import { USER_ROLES, employees } from '../../constants';
import { QUALITY_ACTIONS } from '../../redux/actions/qualityActions';

const mapStateToProps = state => ({
  user: state.user,
  quality_types: state.quality_types,
  confirmationDisplayed: state.feedback.confirmationDisplayed,
  newPostedFeedback: state.feedback.newPostedFeedback,
  newPostedFollowup: state.followup.newPostedFollowup,
});

class FeedbackFormConfirmationView extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    if (!this.props.quality_types.length) {
      this.props.dispatch({ type:  QUALITY_ACTIONS.FETCH_FEEDBACK_QUALITY_CATEGORIES});
    }
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
        <Grid container style={{padding: '10px'}}>
          <Grid item xs={12}>
            <Typography variant="h4" className="center" gutterBottom>
              Feedback Confirmed
            </Typography>
            <Typography variant="h5" className="center" gutterBottom>
              Employee
            </Typography>
            <Typography variant="body1" className="center" gutterBottom>
              {`${employee.first_name} ${employee.last_name}`}
            </Typography>
            <Typography variant="h5" className="center" gutterBottom>
              Feedback
            </Typography>
            <Typography variant="body1" className="center" gutterBottom>
              Quality: {this.props.quality_types.find(type => type.id === feedback.quality_id).name}<br />
              {feedback.task_related && 'Task-Related'}
              {feedback.task_related && <br />}
              {feedback.culture_related && 'Culture-Related'}
              {feedback.culture_related && <br />}
            </Typography>
            <Typography variant="h5" className="center" gutterBottom>
              Details
            </Typography>
            <Typography variant="body1" className="center" gutterBottom>
              {feedback.details}
            </Typography>
            {followup &&
              <div>
                <Typography variant="h6" className="center" gutterBottom>
                  Follow-up needed on
                </Typography>
                <Typography>
                  {moment(followup.follow_up_date).format('dddd, MMMM Do YYYY')}
                </Typography>
              </div>
            }
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleClick}>
              Okay
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      this.props.history.push('/dashboard');
      return null;
    }
  }
}

export default connect(mapStateToProps)(FeedbackFormConfirmationView);