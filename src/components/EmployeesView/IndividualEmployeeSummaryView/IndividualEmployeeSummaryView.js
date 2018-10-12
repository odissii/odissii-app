import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';
//Components
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
//Styling
import './IndividualEmployeeSummaryView.css';
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

    //This will get all of the feedback
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
    } //end of getFeedbackCount()

    render() {

        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div className="header">
                            <h1>
                                {/* This arrow_back icon button will take the user back to the /employees view */}
                                <Button component={Link} to={"/employees"}>
                                    <Icon>arrow_back</Icon>
                                </Button>
                                {/* If the selected employee name is not yet render, display null, otherwise display the first name */}
                                {this.props.feedback.currentEmployee[0] ? this.props.feedback.currentEmployee[0].first_name : null}
                            </h1>
                        </div>
                        <br />
                        <div>
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
                                    {/* This will map over the array and pass it as "feedback" to the DisplayFeedback Component */}
                                    {this.props.feedback.currentEmployee.map((feedbacksAtIndex, index) => {
                                        return (
                                            <DisplayFeedback key={index} feedback={feedbacksAtIndex} />
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default connect(mapStateToProps)(IndividualEmployeeSummaryView);