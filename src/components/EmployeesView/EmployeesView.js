import React from 'react';

import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import Nav from '../../components/Nav/Nav';
import SupervisorEmployees from './SupervisorEmployees/SupervisorEmployees';
import ManagerEmployees from './ManagerEmployees/ManagerEmployees';
import { USER_ROLES } from '../../constants';

const mapStateToProps = state => ({
  user: state.user,
});

class EmployeesView extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  render() {
    let userEmployees;

    if (this.props.user.userName && this.props.user.role === USER_ROLES.SUPERVISOR) {
      userEmployees = ( 
      <SupervisorEmployees />
      )
    } else if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
      userEmployees = (
      <ManagerEmployees />
      )
    }
    return (
      <div>
        <div>
          {userEmployees}
        </div>
        <Nav />
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(EmployeesView);