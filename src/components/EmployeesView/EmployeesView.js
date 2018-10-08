import React from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

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
    return (
      <div>
        <Nav />
        <div>
          This is the employees view.
          Either the ManagerEmployees or SupervisorEmployees view will show here.
        </div>
      </div>
      
    );
  }
}

export default connect(mapStateToProps)(EmployeesView);