import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';


import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FormGroup } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

const booleanFields = ['taskRelated', 'cultureRelated', 'followUpNeeded'];

class FeedbackFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quality: 'praise',
      taskRelated: false,
      cultureRelated: false,
      details: '',
      followUpNeeded: false,
      followUpDate: undefined,
    };
  }


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  handleInputChange = formField => event => {
    // if the form field is for a boolean value...
    if (booleanFields.includes(formField)) {
      //...toggle that value
      this.setState(prevState => ({
        [formField]: !prevState[formField]
      }));
    } else {
      this.setState({
        [formField]: event.target.value
      });
    }

    console.log(formField, event.target.value);
  };

  render() {
    const {quality, taskRelated, cultureRelated, details, followUpNeeded, followUpDate} = this.state;
    
    // let followUpDateField;
    // if (followUpNeeded) {
    //   followUpDateField = (
    //     <TextField 
    //       label="Follow-Up Date"
    //       type="date"
    //     />
    //   );
      
    // }
    
    return (
      <div>
        <Nav />
        <div>
          This is the feedback form.
        </div>
        <FormControl>
          <FormLabel>Feedback Quality</FormLabel>
          <RadioGroup
            aria-label="feedback-type"
            name="quality"
            value={quality}
            onChange={this.handleInputChange('quality')}
          >
            <FormControlLabel value="praise" label="Praise" control={<Radio />}/>
            <FormControlLabel value="instruct" label="Instruct" control={<Radio />}/>
            <FormControlLabel value="correct" label="Correct" control={<Radio />}/>
          </RadioGroup>
          <FormLabel>This feedback is:</FormLabel>
          <FormGroup>
            <FormControlLabel 
              control={
                <Switch 
                  checked={taskRelated}
                  onChange={this.handleInputChange('taskRelated')}
                />
              }
              label="Task-Related"
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={cultureRelated}
                  onChange={this.handleInputChange('cultureRelated')}
                />
              }
              label="Culture-Related"
            />
          </FormGroup>
          <FormControlLabel 
            label="Follow-Up Needed?"
            control={
              <Checkbox 
                checked={followUpNeeded}
                onChange={this.handleInputChange('followUpNeeded')}
              />
            }
          />
          {/* follow-up date picker renders if the user checks the "Follow-Up Needed? box" */}
          {followUpNeeded
          ? <TextField 
              type="date"
              label="Follow-Up Date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          : null}
          <TextField 
            label="Feedback Details"
            placeholder="Type or dictate feedback details"
            value={details}
            onChange={this.handleInputChange('details')}
            multiline
          />
        </FormControl>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(FeedbackFormView);