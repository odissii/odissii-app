import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
//Components
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
import DisplayOverallGraph from './DisplayGraphs/DisplayOverallGraph/DisplayOverallGraph';
//Styling
import './IndividualEmployeeSummaryView.css';
import { withStyles } from '@material-ui/core/styles';
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

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
}; //end of styles

class IndividualEmployeeSummaryView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalQualityCount: [],
        }
    } //end of constructor

    componentDidMount() {
        this.getTotalFeedbackCount();
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
        this.props.dispatch({ type: FEEDBACK_ACTIONS.FETCH_CURRENT_EMPLOYEE_FEEDBACK });
    } //end of componentDidMount

    //This will get the total feedback of each category for the employee
    getTotalFeedbackCount() {
        axios.get(`/api/feedback/employeeFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    totalQualityCount: response.data
                })
            }).catch((error) => {
                console.log('error in getFeedbackCount', error);
                alert('Cannot get client feedback counts!')
            });
    } //end of getTotalFeedbackCount()

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
                        <h2>Overall Feedback:</h2>
                        {/* {JSON.stringify(this.state.qualityCount)} */}
                        {/* This will map over the over the total feedback */}
                        {this.state.totalQualityCount.map((totalFeedback, index) => {
                            return (
                                <DisplayOverallGraph key={index} totalFeedback={totalFeedback} />
                            )
                        })}
                        <h2>Feedback:</h2>
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow styles={styles.row}>
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

export default withStyles(styles)(connect(mapStateToProps)(IndividualEmployeeSummaryView));