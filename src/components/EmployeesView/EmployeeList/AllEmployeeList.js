import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Grid, Avatar, Button, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import { USER_ROLES } from '../../../constants';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions';
import Edit from '@material-ui/icons/Edit';
import orderBy from 'lodash/orderBy';


const moment = require('moment');

const mapStateToProps = state => ({
    user: state.user,
    people: state.people.staff.allEmployees,
    employees: state.people.staff.supervisorEmployees,
    search: state.search,
    filter: state.filter,
    sort: state.sort,
})

const styles = {
    table: {
        marginTop: 5,
    },
    tableCell : {
        padding: 0,
        textAlign: 'center',
    }
}

const invertDirection = {
    asc: 'desc',
    desc: 'asc'
}

class AllEmployeeList extends React.Component {
    componentDidMount() {
        this.getEmployees();
        orderBy(this.props.people, this.props.sort.column, this.props.sort.direction);
    }

    getEmployees = () => {
        this.props.dispatch({ type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES });
    }

    handleSort = columnName => {
        this.props.dispatch({ type: 'ADD_COLUMN_TO_SORT', payload: columnName});
        let direction = this.props.sort.column === columnName ? invertDirection[this.props.sort.direction] : 'desc';
        this.props.dispatch({type: 'ADD_SORT_DIRECTION', payload: direction });
    }

    handleClick = (id) => {
        this.props.history.push(`/edit/employee/${id}`);
    }

    render() {
        let content = null;
        let data = orderBy(this.props.people, this.props.sort.column, this.props.sort.direction);
        
        if (this.props.user.role === USER_ROLES.MANAGER) {
            let filteredEmployees = data.filter(
                (employee) => {
                    return employee.first_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 || employee.last_name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1;
                }
            )
            content = (
                <Table style={styles.table}>
                    <TableHead>  
                        <TableRow>
                            <TableCell style={styles.tableCell} onClick={() => this.handleSort('last_name')}>Employee Name</TableCell>
                            <TableCell style={styles.tableCell} onClick={() => this.handleSort('recent')}>Last&nbsp;Feedback</TableCell>
                            <TableCell style={styles.tableCell}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.map((employee) => {
                            return <TableRow key={employee.id} value={employee}>
                                <TableCell style={styles.tableCell}>
                                        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                            <Avatar style={{marginRight: '10px', marginLeft: '10px'}} alt={employee.first_name} src={employee.image_path} />
                                            {employee.first_name}&nbsp;{employee.last_name}</div>
                                </TableCell>
                                <TableCell style={styles.tableCell}>
                                {employee.recent && moment(employee.recent).format("MM/DD/YYYY")} 
                                </TableCell>
                                <TableCell style={styles.tableCell}>
                                    <Button onClick={() => this.handleClick(employee.id)}>
                                        <Edit />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            );
        }
        return (
            <Grid>
                    {content}
            </Grid>
        );
    }
}

export default withRouter(connect(mapStateToProps)(AllEmployeeList));