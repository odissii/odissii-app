import React from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import SupervisorDashboard from './SupervisorDashboard/SupervisorDashboard';
import ManagerDashboard from './ManagerDashboard/ManagerDashboard';

const mapStateToProps = state => ({
  user: state.user,
});

class DashboardView extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  render(){
    return (
      <div>
        <Nav />
        <div>
          This is the dashboard. 
          Either the SupervisorDashboard or ManagerDashboard view will show here.
        </div>
      </div>
      
    )
  }
}

export default connect(mapStateToProps)(DashboardView);