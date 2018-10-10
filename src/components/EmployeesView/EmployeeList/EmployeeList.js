import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import axios from 'axios';
import { USER_ROLES } from '../../../constants';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions';


const mapStateToProps = state => ({
    user: state.user,
    people: state.people.staff.allEmployees,
    employees: state.people.staff.managerEmployees,
})

const space = ' ';

class EmployeeList extends React.Component {

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        if (this.props.user.role === USER_ROLES.MANAGER) {
            this.props.dispatch({ type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES });
        } else if (this.props.user.role === USER_ROLES.SUPERVISOR) {
            this.props.dispatch({ type: PEOPLE_ACTIONS.SET_MANAGER_EMPLOYEES });
        }
    }

    render() {
        let content = null;
        if (this.props.user.role === USER_ROLES.MANAGER) {
            content = (
                <List>
                    {this.props.people.map((employee) => {
                        return <ListItem key={employee.id} value={employee}>
                            <ListItemAvatar>
                                <Avatar alt={employee.first_name} src={employee.image_path} />
                            </ListItemAvatar>
                            <ListItemText primary={employee.first_name + space + employee.last_name} />
                            <ListItemSecondaryAction>
                                <IconButton>

                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            );
        } else if (this.props.user.role === USER_ROLES.SUPERVISOR) {
            content = (
                <List>
                    {this.props.employees.map((employee) => {
                        return <ListItem key={employee.id} value={employee}>
                            <ListItemAvatar>
                                <Avatar alt={employee.first_name} src={employee.image_path} />
                            </ListItemAvatar>
                            <ListItemText primary={employee.first_name + space + employee.last_name} />
                            <ListItemSecondaryAction>
                                <IconButton>

                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>
            )
        }

        return (
            <Grid>
                <div>
                    {content}
                </div>
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(EmployeeList);