import React from 'react';
import { Link } from 'react-router-dom';

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
