import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
import './IndividualEmployeeSummary.css';
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';
//Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Buttons
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  Grid } from '@material-ui/core';
import DisplayGraphs from './DisplayGraphs/DisplayGraphs';

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback.feedback,
});

const styles = theme => ({
    stickyButton: {
        bottom: '1rem',
    },
});

class IndividualEmployeeSummaryView extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         qualityCount: [],
    //         value: 0,
    //     };
    // } //end of constructor

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
        const { classes, theme } = this.props;

        let content = null;
        content = (
            <div className="outer">
                <div className="btnContainer">
                    <Button variant="fab" color="primary" aria-label="Edit" style={styles.stickyButton}
                        component={Link} to={"/feedback/new"}>
                        <Icon>edit_icon</Icon>
                    </Button>
                </div>
                <div className="container">
                    <h1>
                        <Button component={Link} to={"/employees"}>
                            <Icon>arrow_back</Icon>
                        </Button>
                        {this.state.qualityCount[0] ? this.state.qualityCount[0].first_name : null}
                    </h1>
                    <DisplayGraphs />
                </div>
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
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

IndividualEmployeeSummaryView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(IndividualEmployeeSummaryView));