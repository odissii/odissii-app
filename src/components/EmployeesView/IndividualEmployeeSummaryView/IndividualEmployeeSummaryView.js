import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
//Buttons
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
//Swipeable Tab Views
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Grid } from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.user,
    feedback: state.feedback.feedback,
});

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class IndividualEmployeeSummaryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            qualityCount: [],
            value: 0,
        };
    } //end of constructor

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

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
            <div>
                <h1>
                    <Button variant="contained" component={Link} to={"/employees"}>
                        <Icon>arrow_back</Icon>
                    </Button>
                    Employee Name
                </h1>
                <Grid container spacing={0}>
                    <Grid item xs={10}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth>
                                <Tab label="Weekly" />
                                <Tab label="Monthly" />
                                <Tab label="Yearly" />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                {JSON.stringify(this.state.qualityCount)}
                                {this.state.qualityCount.map((qualityAtIndex, index) => {
                                    return (
                                        <DisplayGraph key={index} quality={qualityAtIndex} />
                                    )
                                })}
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                {/* {JSON.stringify(this.state.qualityCount)} */}
                                {this.state.qualityCount.map((qualityAtIndex, index) => {
                                    return (
                                        <DisplayGraph key={index} quality={qualityAtIndex} />
                                    )
                                })}
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                {/* {JSON.stringify(this.state.qualityCount)} */}
                                {this.state.qualityCount.map((qualityAtIndex, index) => {
                                    return (
                                        <DisplayGraph key={index} quality={qualityAtIndex} />
                                    )
                                })}
                            </TabContainer>
                        </SwipeableViews>
                        <Button variant="fab" color="primary" aria-label="Edit" className="btn"
                            component={Link} to={"/feedback/new"}>
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