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
            weeklyQualityCount: [],
            quarterlyQualityCount: [],
            annuallyQualityCount: [],
            value: 0,
            wPraise: 0,
            wInstruct: 0,
            wCorrect: 0,
            qPraise: 0,
            qInstruct: 0,
            qCorrect: 0,
            aPraise: 0,
            aInstruct: 0,
            aCorrect: 0,
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

    //This will get the total feedback for the past 30 days of each category for the employee
    getWeeklyFeedbackCount() {
        console.log('in getWeekly');  
        axios.get(`/api/feedback/employeeWeeklyFeedbackCount/1`)
            .then((response) => {
                console.log('');
                
                this.setState({
                    weeklyQualityCount: response.data
                })  
                this.sortWeeklyCount(response.data);
            }).catch((error) => {
                console.log('error in getWeeklyFeedbackCount', error);
                alert('Cannot get weekly feedback counts!')
            });
    }; //end of getWeeklyFeedbackCount()

    sortWeeklyCount(weekArray) {
        console.log('DATE', weekArray);
        for (let i = 0; i < weekArray.length; i++) {
            if (weekArray[i].name === 'Praise') {
                this.setState({
                    wPraise: this.state.wPraise += 1
                })
            } else if (weekArray[i].name === 'Instruct') {
                this.setState({
                    wInstruct: this.state.wInstruct += 1
                })
            } else if (weekArray[i].name === 'Correct') {
                this.setState({
                    wCorrect: this.state.wCorrect += 1
                })
            }; //end of if-else
        }; //end of for loop
    }; //end of sortWeeklyCount()

    //This will get the total quarterly feedback for each category for the employee
    getQuarterlyFeedbackCount() {
        console.log('in getQuarterly');
        axios.get(`/api/feedback/employeeQuarterlyFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    quarterlyQualityCount: response.data
                })
                this.sortQuarterlyCount(response.data);
            }).catch((error) => {
                console.log('error in getQuarterlyFeedbackCount', error);
                alert('Cannot get quarterly feedback counts!')
            });
    }; //end of getQuarterlyFeedbackCount()

    sortQuarterlyCount(quarterlyArray) {
        console.log('QUARTERLY', quarterlyArray);
        for (let i = 0; i < quarterlyArray.length; i++) {
            if (quarterlyArray[i].name === 'Praise') {
                this.setState({
                    qPraise: this.state.qPraise += 1
                })
            } else if (quarterlyArray[i].name === 'Instruct') {
                this.setState({
                    qInstruct: this.state.qInstruct += 1
                })
            } else if (quarterlyArray[i].name === 'Correct') {
                this.setState({
                    qCorrect: this.state.qCorrect += 1
                })
            }; //end of if-else
        }; //end of for loop
    }; //end of sortQuarterlyCount()

    //This will get the total annually feedback for each category for the employee
    getAnnuallyFeedbackCount() {
        console.log('in getAnnually');   
        axios.get(`/api/feedback/employeeAnnuallyFeedbackCount/1`)
            .then((response) => {
                this.setState({
                    annuallyQualityCount: response.data
                })
                this.sortAnnuallyCount(response.data);
            }).catch((error) => {
                console.log('error in getAnnuallyFeedbackCount', error);
                alert('Cannot get annually feedback counts!')
            });
    }; //end of getAnnuallyFeedbackCount()

    sortAnnuallyCount(annuallyArray) {
        console.log('QUARTERLY', annuallyArray);
        for (let i = 0; i < annuallyArray.length; i++) {
            if (annuallyArray[i].name === 'Praise') {
                this.setState({
                    aPraise: this.state.aPraise += 1
                })
            } else if (annuallyArray[i].name === 'Instruct') {
                this.setState({
                    aInstruct: this.state.aInstruct += 1
                })
            } else if (annuallyArray[i].name === 'Correct') {
                this.setState({
                    aCorrect: this.state.aCorrect += 1
                })
            }; //end of if-else
        }; //end of for loop
    }; //end of sortAnnuallyCount()

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
                            {/* This will contain the past 30 days bar chart view */}
                            {/* {JSON.stringify(this.state.weeklyQualityCount)} */}
                            <DisplayWeeklyGraph praise={this.state.wPraise} instruct={this.state.wInstruct} correct={this.state.wCorrect} />         
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            {/* This will contain the quarterly bar chart view */}
                            {/* {JSON.stringify(this.state.quarterlyQualityCount)} */}
                            <DisplayQuarterlyGraph praise={this.state.qPraise} instruct={this.state.qInstruct} correct={this.state.qCorrect} />
                        </TabContainer>
                        <TabContainer dir={theme.direction}>
                            {/* This will contain the annually bar chart view */}
                            {/* {JSON.stringify(this.state.annuallyQualityCount)} */}
                            <DisplayAnnuallyGraph praise={this.state.aPraise} instruct={this.state.aInstruct} correct={this.state.aCorrect} />
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