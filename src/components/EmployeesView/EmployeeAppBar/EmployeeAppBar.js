import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, IconButton, Typography, SearchIcon, InputBase } from '@material-ui/core';
import { USER_ROLES } from '../../../constants';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';

const mapStateToProps = state => ({
    user: state.user,
})

class EmployeeAppBar extends React.Component {
    render() {
        let content = null;
        if (this.props.user.userName && this.props.user.role === USER_ROLES.SUPERVISOR) {
            content = (
                <div>
                    <AppBar>
                        <Toolbar>
                            <IconButton><ArrowBack /></IconButton>
                            <Typography>Employees</Typography>
                            <div>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search..." />
                        </Toolbar>
                    </AppBar>
                </div>
            )
        } else if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
            content = (
                <div>
                    <AppBar>
                        <Toolbar>
                            <IconButton><ArrowBack /></IconButton>
                            <Typography>All Employees</Typography>
                            <div>
                                <Search />
                            </div>
                            <InputBase
                                placeholder="Search..." />
                        </Toolbar>
                    </AppBar>
                </div>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(EmployeeAppBar);