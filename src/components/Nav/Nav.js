import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import Group from '@material-ui/icons/Group';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Create from '@material-ui/icons/Create';
import ShowChart from '@material-ui/icons/ShowChart';
import Menu from '@material-ui/icons/Menu';

const mapStateToProps = state => ({
  user: state.user,
})

class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  state = {
    value: 'dashboard',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };


  render() {
    let content = null;
    const { value } = this.state;
    // if supervisor logged in, will render appropriate nav bar
    if (this.props.user && this.props.user.role === 'supervisor') {
      content = (
        <div className="navbar">
          <BottomNavigation value={value} onChange={this.handleChange}>
            <BottomNavigationAction icon={<ShowChart />} component={Link} to={"/dashboard"} />
            <BottomNavigationAction icon={<Group />} component={Link} to={"/employees"}/>
            <BottomNavigationAction icon={<Create />} component={Link} to={"/feedback/new"} />
            <BottomNavigationAction icon={<Menu />} component={Link} to={"/settings"} />
          </BottomNavigation>
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
