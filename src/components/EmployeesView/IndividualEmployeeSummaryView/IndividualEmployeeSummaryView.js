import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';
//Components
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
//Buttons
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
//Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback.feedback,
});

class IndividualEmployeeSummaryView extends Component {

    componentDidMount() {
        this.getFeedbackCount();
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: FEEDBACK_ACTIONS.FETCH_CURRENT_EMPLOYEE_FEEDBACK });
    }

    getFeedbackCount() {
        axios.get(`/api/feedback/employeeFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    qualityCount: response.data
                })
                console.log('qualityCount:', this.state.qualityCount);
            }).catch((error) => {
                console.log('error in getFeedbackCount', error);
                alert('Cannot get client feedback counts!')
            });
    }

    render() {
        let tableContent = null;
        tableContent = (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Feedback</TableCell>
                                <TableCell>Date Given</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {JSON.stringify(this.props.feedback.currentEmployee)} */}
                            {this.props.feedback.currentEmployee.map((feedbacksAtIndex, index) => {
                                return (
                                    <DisplayFeedback key={index} feedback={feedbacksAtIndex} />
                                )
                            })}
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
        )

        return (
            <div>
                <h1>
                    <Button component={Link} to={"/employees"}>
                        <Icon>arrow_back</Icon>
                    </Button>
                    {/* {this.state.qualityCount[0] ? this.state.qualityCount[0].first_name : null} */}
                </h1>
                { tableContent }
            </div>
        )
    }
}

export default connect(mapStateToProps)(IndividualEmployeeSummaryView);