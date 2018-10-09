import React from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { triggerLogout } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class SettingsView extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render(){
    return (
      <div>
        <Nav />
        <div>
          This is the settings view. Logout and other options will go here.
          <button onClick={this.logout}>Log Out</button>
        </div>
      </div>
      
    )
  }
}

export default connect(mapStateToProps)(SettingsView);