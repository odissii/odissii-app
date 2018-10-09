import React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Switch from '@material-ui/core/Switch';


import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FormGroup } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

const booleanFields = ['taskRelated', 'cultureRelated', 'followUpNedded'];

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
    const {quality, taskRelated, cultureRelated, details} = this.state;
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
            <FormControlLabel value="praise" label="Praise" labelPlacement="start" control={<Radio />}/>
            <FormControlLabel value="instruct" label="Instruct" labelPlacement="start" control={<Radio />}/>
            <FormControlLabel value="correct" label="Correct" labelPlacement="start" control={<Radio />}/>
          </RadioGroup>
          <FormLabel>This feedback is:</FormLabel>
          <FormGroup>
            <FormControlLabel 
              control={
                <Switch 
                  checked={this.state.taskRelated}
                  onChange={this.handleInputChange('taskRelated')}
                />
              }
              label="Task-Related"
              labelPlacement="start"
            />
            <FormControlLabel 
              control={
                <Switch 
                  checked={this.state.cultureRelated}
                  onChange={this.handleInputChange('cultureRelated')}
                />
              }
              label="Culture-Related"
              labelPlacement="start"
            />
          </FormGroup>
        </FormControl>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(FeedbackFormView);