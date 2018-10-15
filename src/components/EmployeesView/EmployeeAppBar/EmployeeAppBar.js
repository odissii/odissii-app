import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import { USER_ROLES } from '../../../constants';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';

const mapStateToProps = state => ({
    user: state.user,
})

class EmployeeAppBar extends React.Component {
    handleChange = (event) => {
        this.props.dispatch({ type: 'ADD_SEARCH', payload: event.target.value });
    } 

    handleClick = (event) => {
        console.log('in handleClick');
        this.props.history.push('/dashboard');
    }
    render() {
        let content = null;
        if (this.props.user.userName && this.props.user.role === USER_ROLES.SUPERVISOR) {
            content = (
                        <Toolbar>
                            <IconButton onClick={this.handleClick}><ArrowBack /></IconButton>
                            <Typography>Employees</Typography>
                            <div>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search..." 
                                onChange={this.handleChange}/>
                        </Toolbar>
            )
        } else if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
            content = (
                        <Toolbar>
                            <IconButton onClick={this.handleClick}><ArrowBack /></IconButton>
                            <Typography>All Employees</Typography>
                            <div>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search..." 
                                onChange={this.handleChange}/>
                        </Toolbar>
            )
        }
        return (
            <AppBar position="sticky">
                {content}
            </AppBar>
        )
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeAppBar));