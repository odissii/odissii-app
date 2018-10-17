import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { QUALITY_ACTIONS } from '../../redux/actions/qualityActions';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const booleanFields = ['task_related', 'culture_related', 'followUpNeeded'];

const mapStateToProps = state => ({
  user: state.user,
  quality_types: state.quality_types,
});

// feedback/detail/:feedbackId
class FeedbackDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalFeedback: null,
      formFields: null,
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
      if (!this.state.originalFeedback) {
        console.log('axios request')
        axios.get(`/api/feedback/detail/${this.props.match.params.feedbackId}`)
        .then(response => {
          const data = response.data;
          data.quality_id = data.quality_id.toString();
          this.setState({
            originalFeedback: data,
            formFields: {...data}
          });
        }).catch(error => {
          console.log(`/api/feedback/detail/${this.props.match.params.feedbackId} GET request error:`, error);
        });
      }
    }
  }

  getQualityName = qualityId => this.props.quality_types.find(type => type.id === qualityId);

  handleInputChange = fieldName => event => {
    if (booleanFields.includes(fieldName)) {
      this.setState({
        formFields: {
          ...this.state.formFields,
          [fieldName]: !this.state.formFields[fieldName]
        }
      });
    } else {
      this.setState({
        formFields: {
          ...this.state.formFields,
          [fieldName]: String(event.target.value)
        }
      });
    }
    console.log(fieldName, event.target.value);
  };

  abandonChanges = () => {
    this.setState({
      formFields: {...this.state.originalFeedback}
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const editedFeedback = {...this.state.formFields, date_edited: new Date()};
    axios.put('/api/feedback', editedFeedback)
    .then(response => {
      this.setState({
        originalFeedback: {...editedFeedback},
        formFields: {...editedFeedback}
      });
    }).catch(error => {
      console.log('/api/feedback PUT error:', error);
    });
  };

  render() {
    const { originalFeedback, formFields } = this.state;
    const { quality_types } = this.props;
    let content = null;
    if (!originalFeedback || !quality_types) return null;

    const editingCutoffTime = moment(originalFeedback.date_created).add(72, 'hours');
    const editingAllowed = moment().isBefore(editingCutoffTime);

    if (editingAllowed) {
      content = (
        <form style={{width: '75%', maxWidth: '500px'}} onSubmit={this.handleFormSubmit}>
          <FormControl required>
            <FormLabel>Feedback Quality</FormLabel>
            <RadioGroup
              aria-label="feedback-type"
              name="quality_id"
              value={formFields.quality_id}
              onChange={this.handleInputChange('quality_id')}
            >
              {this.props.quality_types.map(quality => (
                <FormControlLabel key={quality.id} value={quality.id.toString()} label={quality.name} control={<Radio />}/>
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>This feedback is:</FormLabel>
            <FormGroup>
              <FormControlLabel 
                control={
                  <Switch 
                    checked={formFields.task_related}
                    onChange={this.handleInputChange('task_related')}
                  />
                }
                label="Task-Related"
              />
              <FormControlLabel 
                control={
                  <Switch 
                    checked={formFields.culture_related}
                    onChange={this.handleInputChange('culture_related')}
                  />
                }
                label="Culture-Related"
              />
            </FormGroup>
          </FormControl>
          <TextField required
            label="Feedback Details"
            placeholder="Type or dictate feedback details"
            value={formFields.details}
            onChange={this.handleInputChange('details')}
            multiline
          />
          {!_.isEqual(originalFeedback, formFields) && 
            <div>
              <Button onClick={this.abandonChanges}>Cancel</Button>
              <Button type="submit" color="primary" variant="contained">Save</Button>
            </div>
          }
        </form>
      );
    } else {
      content = (
        <div>
          <ul>
            <li>Feedback quality: {this.getQualityName(originalFeedback.quality_id)}</li>
            <li>Task-Related: {JSON.stringify(originalFeedback.task_related)}</li>
            <li>Culture-Related: {JSON.stringify(originalFeedback.culture_related)}</li>
            <li>Details: {originalFeedback.details}</li>
            {/* {originalFeedback.follow_up_date && <li></li>} */}
          </ul>
          
        </div>
      );
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <div>Feedback for: {`${originalFeedback.first_name} ${originalFeedback.last_name}`}</div>
          <div>Feedback created on: {moment(originalFeedback.date_created).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
          {originalFeedback.date_edited && <div>Last edit on: {moment(originalFeedback.date_edited).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>}
          {content}
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(FeedbackDetailView);