import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, List, ListItem, Avatar, ListItemAvatar, ListItemSecondaryAction, ListItemText, IconButton } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
})

class EmployeeList extends React.Component {
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