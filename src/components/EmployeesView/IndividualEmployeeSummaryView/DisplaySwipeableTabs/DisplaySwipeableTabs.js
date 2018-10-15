import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
//Component Views
import DisplayWeeklyGraph from '../DisplayGraphs/DisplayWeeklyGraph/DisplayWeeklyGraph';
import DisplayQuarterlyGraph from '../DisplayGraphs/DisplayQuarterlyGraph/DisplayQuarterlyGraph';
import DisplayAnnuallyGraph from '../DisplayGraphs/DisplayAnnuallyGraph/DisplayAnnuallyGraph';
//Swipeable Tab Views
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Grid } from '@material-ui/core';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 5 }}>
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

class DisplaySwipeableTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            weeklyqualityCount: [],
            quarterlyqualityCount: [],
            annuallyqualityCount: [],
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
        this.getWeeklyFeedbackCount();
        this.getQuarterlyFeedbackCount();
        this.getAnnuallyFeedbackCount();
    }; //end of componentDidMount()

    //This will get the total feedback for the past 3-4 weeks of each category for the employee
    getWeeklyFeedbackCount() {
        console.log('in getWeekly');  
        axios.get(`/api/feedback/employeeWeeklyFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    weeklyQualityCount: response.data
                })
            }).catch((error) => {
                console.log('error in getWeeklyFeedbackCount', error);
                alert('Cannot get weekly feedback counts!')
            });
    }; //end of getWeeklyFeedbackCount()

    //This will get the total quarterly feedback for each category for the employee
    getQuarterlyFeedbackCount() {
        console.log('in getQuarterly');
        axios.get(`/api/feedback/employeeQuarterlyFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    quarterlyqualityCount: response.data
                })
            }).catch((error) => {
                console.log('error in getQuarterlyFeedbackCount', error);
                alert('Cannot get quarterly feedback counts!')
            });
    }; //end of getQuarterlyFeedbackCount()

    //This will get the total annually feedback for each category for the employee
    getAnnuallyFeedbackCount() {
        console.log('in getAnnually');   
        axios.get(`/api/feedback/employeeAnnuallyFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    annuallyqualityCount: response.data
                })
            }).catch((error) => {
                console.log('error in getAnnuallyFeedbackCount', error);
                alert('Cannot get annually feedback counts!')
            });
    }; //end of getAnnuallyFeedbackCount()

    render() {
        const { theme } = this.props;

        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth>
                            <Tab label="Weekly" />
                            <Tab label="Quarterly" />
                            <Tab label="Annually" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir={theme.direction}>
                            {/* This will contain the past 3 to 4 weeks bar chart view */}
                            {JSON.stringify(this.state.weeklyQualityCount)}
                            {/* {this.state.weeklyQualityCount.map((weekFeedback, index) => {
                                        return (
                                            <DisplayWeeklyGraph key={index} weekFeedback={weekFeedback} />
                                        )
                                    })} */}
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            {/* This will contain the quarterly bar chart view */}
                            {JSON.stringify(this.state.quarterlyqualityCount)}
                            {/* {this.state.quarterlyqualityCount.map((quarterFeedback, index) => {
                                        return (
                                            <DisplayQuarterlyGraph key={index} quarterFeedback={quarterFeedback} />
                                        )
                                    })} */}
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            {/* This will contain the annually bar chart view */}
                            {JSON.stringify(this.state.annuallyqualityCount)}
                            {/* {this.state.annuallyqualityCount.map((annualFeedback, index) => {
                                        return (
                                            <DisplayAnnuallyGraph key={index} annualFeedback={annualFeedback} />
                                        )
                                    })} */}
                        </TabContainer>
                    </SwipeableViews>
                </Grid>
            </Grid>
        )
    }
}

DisplaySwipeableTabs.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(connect()(DisplaySwipeableTabs));