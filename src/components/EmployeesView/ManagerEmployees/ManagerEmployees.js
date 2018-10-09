import React from 'react';
import { connect } from 'react-redux';
import EmployeeFilter from '../EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from '../EmployeeAppBar/EmployeeAppBar';

const mapStateToProps = state => ({
  user: state.user,
})
class ManagerEmployees extends React.Component {
  render(){
    return (
      <div>
        <EmployeeAppBar />
        <EmployeeFilter />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ManagerEmployees);