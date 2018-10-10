import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';
import axios from 'axios';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions';


const mapStateToProps = state => ({
    user: state.user,
    people: state.people,
})

class EmployeeList extends React.Component {

    componentDidMount() {
        this.getAllEmployees();
    }

    getAllEmployees = () => {
        console.log('in getAllEmployees')
        this.props.dispatch({ type: PEOPLE_ACTIONS.FETCH_ALL_EMPLOYEES});
    }

    render() {
        return (
            <Grid>
                <div>
                    <List>
                        {/* {this.state.people.staff.allEmployees.map((employees) => {
                            return <ListItem key={employee.id} value={employee}>
                             <ListItemAvatar>
                                <Avatar></Avatar>
                            </ListItemAvatar>
                            <ListItemText />
                            <ListItemSecondaryAction>
                                <IconButton>

                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        })} */}
                    </List>
                </div>
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(EmployeeList);