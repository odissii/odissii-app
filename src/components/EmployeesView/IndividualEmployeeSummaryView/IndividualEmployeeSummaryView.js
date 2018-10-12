import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayGraph from './DisplayGraph/DisplayGraph';
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

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback.feedback,
});

class IndividualEmployeeSummaryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            qualityCount: [],
        };
    } //end of constructor

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

    moveToNextView() {
        console.log('in moveToNextView');
        //will get push to the next view
        // this.props.history.push('/');
    }

    render() {

        let content = null;
        content = (
            <div>
                
                {/* {JSON.stringify(this.state.qualityCount)} */}
                {this.state.qualityCount.map((qualityAtIndex, index) => {
                    return (
                        <DisplayGraph key={index} quality={qualityAtIndex} />
                    )
                })}
                <Button variant="fab" color="primary" aria-label="Edit" className="btn"
                    onClick={this.moveToNextView}>
                    <Icon>edit_icon</Icon>
                </Button>
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
                
            </div>
        )
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(IndividualEmployeeSummaryView);