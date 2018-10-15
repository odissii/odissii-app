import React from 'react';
import { connect } from 'react-redux';
import { Grid, Avatar, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import axios from 'axios';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions';

const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    people: state.people.staff.allEmployees,
    employees: state.people.staff.supervisorEmployees,
    search: state.search,
    filter: state.filter,
})

const space = ' ';


class EmployeeList extends React.Component {

    componentDidMount() {
        this.getEmployees();
    }

    getEmployees = () => {
        if (this.props.filter === '' || this.props.filter === 'name') {
            this.getEmpoloyeesByName();
        } else if (this.props.filter === 'date') {
            this.getEmployeesByFeedbackDate();
        } else if (this.props.filter === 'feedback') {
            this.getEmployeesByFeedbackQuantity();
        }
    }

    getEmpoloyeesByName = () => {
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

    getEmployeesByFeedbackDate = () => {

    }

    getEmployeesByFeedbackQuantity = () => {

    }

    render() {
        let content = null;
        if (this.props.user) {
            let filteredEmployees = this.props.employees.filter(
                (employee) => {
                    return employee.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 || employee.last_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
                }
            )
            content = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{padding: '0'}}>Employee Name</TableCell>
                            <TableCell style={{padding: '0'}}>Last&nbsp;Feedback</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredEmployees.map((employee) => {
                        return <TableRow key={employee.id} value={employee}>
                            <TableCell>
                                <div style={{display: 'flex', alignItems: 'center', height: '100%'}}><Avatar style={{marginRight: '10px'}} alt={employee.first_name} src={employee.image_path} />  {employee.first_name + space + employee.last_name}</div>
                            </TableCell>
                            <TableCell>{moment(employee.recent).format("MM/DD/YYYY")}</TableCell>
                        </TableRow>
                    })}
                  </TableBody>              
                </Table>
            )
        }

        return (
            <Grid>
                {content}
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(EmployeeList);