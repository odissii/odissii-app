import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { QUALITY_ACTIONS } from '../../redux/actions/qualityActions';

const mapStateToProps = state => ({
  user: state.user,
  quality_types: state.quality_types,
});


// feedback/detail/:feedbackId
class FeedbackDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: null
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    if (!this.props.quality_types.length) {
      this.props.dispatch({ type:  QUALITY_ACTIONS.FETCH_FEEDBACK_QUALITY_CATEGORIES});
    }

    
  }

  componentDidUpdate() {
    const { user, history } = this.props;

    if (!user.isLoading && user.userName === null) {
      history.push('/home');
    } else if (!user.isLoading && user.userName) {
      if (!this.state.feedback) {
        axios.get(`/api/feedback/detail/${this.props.match.params.feedbackId}`)
        .then(response => {
          this.setState({
            feedback: response.data
          });
        }).catch(error => {
          console.log(`/api/feedback/detail/${this.props.match.params.feedbackId} GET request error:`, error);
        });
      }
    }
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.feedback)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FeedbackDetailView);