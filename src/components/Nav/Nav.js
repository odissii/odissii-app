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
    // if supervisor logged in, will render appropriate nav bar
    if (this.props.user && this.props.user.role === 'supervisor') {
      content = (
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
              <Link to="/settings">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      )
      // if manager logged in, will render appropriate nav bar
    } else if (this.props.user && this.props.user.role_id === 'manager') {
      content = (
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
          <Link to="/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
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

export default connect(mapStateToProps)(Nav);
