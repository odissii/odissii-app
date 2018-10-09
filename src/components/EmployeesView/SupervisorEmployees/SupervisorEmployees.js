import React from 'react';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from '../EmployeeAppBar/EmployeeAppBar';

class SupervisorEmployees extends React.Component {
  render(){
    return (
      <div>
      <EmployeeAppBar />
      <EmployeeFilter />
    </div>
    );
  }
}

export default SupervisorEmployees;