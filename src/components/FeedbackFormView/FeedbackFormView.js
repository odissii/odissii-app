import React from 'react';
import { connect } from 'react-redux';

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

import Nav from '../Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { FEEDBACK_ACTIONS } from '../../redux/actions/feedbackActions';

// CREATE TABLE employee (
//   id SERIAL PRIMARY KEY,
//   employeeId VARCHAR (255) UNIQUE NOT NULL,
//   first_name VARCHAR (255) NOT NULL,
//   last_name VARCHAR (255) NOT NULL,
//   image_path VARCHAR (255)
// );
// dummy data for employees
const employees = [
  {
    id: 1,
    employeeId: '123ABC',
    first_name: 'Ricky',
    last_name: 'Bobby',
    image_path: 'some/path'
  },
  {
    id: 2,
    employeeId: '3F85R',
    first_name: 'John',
    last_name: 'Johnson',
    image_path: 'some/path'
  },
  {
    id: 3,
    employeeId: '87FY44',
    first_name: 'Becky',
    last_name: 'Beckyson',
    image_path: 'some/path'
  }
];

const mapStateToProps = state => ({
  user: state.user,
});

const booleanFields = ['taskRelated', 'cultureRelated', 'followUpNeeded'];

class FeedbackFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '',
      quality: 'praise',
      taskRelated: false,
      cultureRelated: false,
      followUpNeeded: false,
      followUpDate: undefined,
      details: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  
  componentDidUpdate() {
    const {user, history} = this.props;
    if (!user.isLoading && user.userName === null) {
      history.push('/home');
    }
    if (!user.isLoading && user.userName && user.role !== 'supervisor') {
      history.push('/home');
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

  handleFormSubmit = event => {
    event.preventDefault();
    const {employeeId, quality, taskRelated, cultureRelated, followUpNeeded, followUpDate, details} = this.state;
    const supervisorId = this.props.user.id;

    const data = {
      supervisorId,
      employeeId,
      dateCreated: Date.now(),
      quality,
      taskRelated,
      cultureRelated,
      details,
    };

    this.props.dispatch({
      type: FEEDBACK_ACTIONS.ADD_FEEDBACK,
      payload: data
    });

    console.log('form submitted:', data);
  };

  backToPreviousPage = event => {
    console.log('back to previous page');
  };

  render() {
    const {employeeId, quality, taskRelated, cultureRelated, details, followUpNeeded, followUpDate} = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <Nav />
          <div>
            This is the feedback form.
          </div>
          <form style={{width: '75%', maxWidth: '500px'}} onSubmit={this.handleFormSubmit}>
            <FormControl required>
              <InputLabel shrink htmlFor="employeeId">Employee</InputLabel>
              <NativeSelect
                value={employeeId}
                onChange={this.handleInputChange('employeeId')}
                input={<Input name="employee" id="employeeId" />}
              >
                <option value="" disabled>Select an employee...</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {`${employee.first_name} ${employee.last_name}`}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl required>
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
            </FormControl>
            <FormControl>
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
            </FormControl>
            <FormControl>
              <FormControlLabel 
                label="Follow-Up Needed?"
                control={
                  <Checkbox 
                    checked={followUpNeeded}
                    onChange={this.handleInputChange('followUpNeeded')}
                  />
                }
              />
            </FormControl>
              {/* follow-up date picker renders if the user checks the "Follow-Up Needed? box" */}
            {followUpNeeded
            ? <FormControl>
                <TextField 
                  type="date"
                  label="Follow-Up Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl> 
            : null}
            <TextField required
              label="Feedback Details"
              placeholder="Type or dictate feedback details"
              value={details}
              onChange={this.handleInputChange('details')}
              multiline
            />
            <div>
              <Button onClick={this.backToPreviousPage}>Cancel</Button>
              <Button type="submit" color="primary" variant="contained">Submit</Button>
            </div>
          </form>
        </Grid>
      </Grid>
      
    );
  }
}

export default connect(mapStateToProps)(FeedbackFormView);