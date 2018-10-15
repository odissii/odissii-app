import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import EmployeeFilter from './EmployeeFilter/EmployeeFilter';
import EmployeeAppBar from './EmployeeAppBar/EmployeeAppBar';
import EmployeeList from './EmployeeList/EmployeeList';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { USER_ROLES } from '../../constants';

const mapStateToProps = state => ({
    user: state.user,
})

class SupervisorEmployees extends React.Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/home');
        }
    }

    render() {
        let allEmployees;

        if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
            allEmployees = (
                <div>
                    <EmployeeAppBar />
                    <EmployeeFilter />
                    <EmployeeList />
                </div>
            )
        }
        return (
            <div>
                {allEmployees}
                <Nav />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(SupervisorEmployees));