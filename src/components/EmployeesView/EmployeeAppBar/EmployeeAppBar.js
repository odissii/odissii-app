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

const styles = {
    grow: {
        flexGrow: 1,
    },
    input: {
        width: 100,
    }
}

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
                    <Typography>Employees</Typography>
                    <div style={styles.grow} />
                    <div>
                        <Search />
                        <InputBase
                            style={styles.input}
                            placeholder="Search..."
                            onChange={this.handleChange} />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(connect(mapStateToProps)(EmployeeAppBar));