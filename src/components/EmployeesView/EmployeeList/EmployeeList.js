import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import axios from 'axios';
import { USER_ROLES } from '../../../constants';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions';


const mapStateToProps = state => ({
    user: state.user,
    people: state.people.staff.allEmployees,
    employees: state.people.staff.supervisorEmployees,
    search: state.search,
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
            const id = this.props.user.id
            axios({
                method: 'GET',
                url: '/api/staff/employees/' + id
            }).then((response) => {
                const employees = response.data;
                const action = { type: PEOPLE_ACTIONS.SET_SUPERVISOR_EMPLOYEES, payload: employees };
                this.props.dispatch(action);
            }).catch((error) => {
                console.log('Supervisor Employee List get error', error);
                alert('Unable to GET supervisor employees');
            })
        }
    }
    

    render() {
        let content = null;
        if (this.props.user.role === USER_ROLES.MANAGER) {
            let filteredEmployees = this.props.people.filter(
                (employee) => {
                    return employee.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 || employee.last_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
                }
            )
            content = (
                <List>
                    {filteredEmployees.map((employee) => {
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
            let filteredEmployees = this.props.employees.filter(
                (employee) => {
                    return employee.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 || employee.last_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
                }
            )
            content = (
                <List>
                    {filteredEmployees.map((employee) => {
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