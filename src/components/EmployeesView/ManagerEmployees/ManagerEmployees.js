import React from 'react';
import { connect } from 'react-redux';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from '../EmployeeAppBar/EmployeeAppBar';
import EmployeeList from '../EmployeeList/EmployeeList';

const mapStateToProps = state => ({
  user: state.user,
})
class ManagerEmployees extends React.Component {
  render() {
    return (
      <div>
        <EmployeeAppBar />
        <EmployeeFilter />
        <EmployeeList />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManagerEmployees);