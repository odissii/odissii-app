import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from '../EmployeeAppBar/EmployeeAppBar';
import EmployeeList from '../EmployeeList/EmployeeList';

const mapStateToProps = state => ({
  user: state.user,
})


class SupervisorEmployees extends React.Component {
  render() {
    return (
      <div>
        <EmployeeAppBar />
        <EmployeeList />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(SupervisorEmployees));