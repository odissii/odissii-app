import React from 'react';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from '../EmployeeAppBar/EmployeeAppBar';
import EmployeeList from '../EmployeeList/EmployeeList';

class SupervisorEmployees extends React.Component {
  render() {
    return (
      <div>
        <EmployeeAppBar />
        <EmployeeFilter />
        <EmployeeList />
      </div>
    );
  }
}

export default SupervisorEmployees;