import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ROLES = [
  {
    id: 1,
    name: 'supervisor',
  },
  {
    id: 2,
    name: 'manager'
  }
];

class RegisterPage extends Component {
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
        message: 'Choose a username and password!',
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

  handleInputChangeFor = propertyName => (event) => {
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
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>
          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="employeeId">
            Employee Id:
              <input
                type="text"
                name="employeeId"
                value={this.state.employeeId}
                onChange={this.handleInputChangeFor('employeeId')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="first_name">
            First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
            Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email_address">
            Email Address:
              <input
                type="email"
                name="email_address"
                value={this.state.email_address}
                onChange={this.handleInputChangeFor('email_address')}
              />
            </label>
          </div>
          <div>
            <label htmlFor="role_id">
              <select value={this.state.role_id} onChange={this.handleInputChangeFor('role_id')}>
                <option value="" disabled>Select user type</option>
                {ROLES.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

