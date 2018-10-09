import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

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
