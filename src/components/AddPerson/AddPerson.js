import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button, FormLabel, NativeSelect} from '@material-ui/core';

class AddPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      employeeId: '',
      first_name: '',
      last_name: '',
      email_address: '',
      role_id: '',
      message: '',
    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({
        message: 'Set a username and password!',
      });
    } else {
      
      const {
        username, 
        password, 
        employeeId, 
        first_name, 
        last_name, 
        email_address, 
        role_id
      } = this.state;

      const body = {
        username, 
        password, 
        employeeId, 
        first_name, 
        last_name, 
        email_address, 
        role_id
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleChangeFor = (propertyName, event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
        <div>
            <div className="center">
            <FormLabel className="label-spacing">Role:</FormLabel>
                <NativeSelect value={this.state.role_id} onChange={(event)=>this.handleChangeFor('role_id', event)}>
                    <option value="">Select One</option>
                    <option value="1">Supervisor</option>
                    <option value="employee">Employee</option>  
                </NativeSelect>
            </div>
            {this.state.role_id === '1' && <p>supervisor setup</p>}
            {this.state.role_id === "employee" && <p>employee setup</p>}
   </div>
    );
  }
}

export default AddPerson;
