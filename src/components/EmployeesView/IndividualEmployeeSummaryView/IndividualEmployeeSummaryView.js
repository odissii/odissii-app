import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';
//chart
import { Bar } from 'react-chartjs-2';
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
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            qualityCount: [],
        };
    } //end of constructor

    componentDidMount() {
        // this.getFeedbackCount();
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
        const options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }

        let data = {
            datasets: [{
                label: 'Praise',
                data: this.state.qualityCount.count,
                backgroundColor: '#0f77e6',
                borderWidth: 1,
                stack: '1'
            },
            {
                label: 'Instruct',
                data: [12],
                backgroundColor: '#f17416',
                borderWidth: 1,
                stack: '2'

            },
            {
                label: 'Correct',
                data: [5],
                backgroundColor: 'lightgrey',
                borderWidth: 1,
                stack: '3'
            }],
            labels: ['label']
        }

        let content = null;
        content = (
            <div>
                <Bar
                    data={data}
                    options={options}
                />
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