import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
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
        return (
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton onClick={this.handleClick}><ArrowBack /></IconButton>
                    <Typography>All Employees</Typography>
                    <div style={{ alignContent: 'right' }}>
                        <Search />
                        <InputBase
                            placeholder="Search..."
                            onChange={this.handleChange} />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeAppBar));