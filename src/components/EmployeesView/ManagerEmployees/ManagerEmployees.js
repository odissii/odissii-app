import React from 'react';
import { connect } from 'react-redux';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
const mapStateToProps = state => ({
  user: state.user,
})
class ManagerEmployees extends React.Component {
  render(){
    return (
      <div>
        <div id="allEmpHeader">All Employees</div>
        <EmployeeFilter />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManagerEmployees);