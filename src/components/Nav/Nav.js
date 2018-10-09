import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
})

class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;
    //supervisor
    if (this.props.user && this.props.user.role_id === '1') {
      content = (
        <div>

        </div>
      )
      // manager
    } else if (this.props.user && this.props.user.role_id === '2') {
      content = (
        <div>

        </div>
      )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/employees">
            Employees
          </Link>
        </li>
        <li>
          <Link to="/feedback/new">
            Give Feedback
          </Link>
        </li>
        <li>
          <Link to="/employee/new">
            Add Employee
          </Link>
        </li>
        <li>
          <Link to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
