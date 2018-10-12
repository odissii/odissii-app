import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class DisplayGraph extends Component {
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

    render() {
        return(
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
                            <Tab label="Monthly" />
                            <Tab label="Yearly" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer>
                            {/* {JSON.stringify(this.state.qualityCount)} */}
                            {/* {this.state.qualityCount.map((qualityAtIndex, index) => {
                                        return (
                                            <DisplayGraph key={index} quality={qualityAtIndex} />
                                        )
                                    })} */}
                            <DisplayGraph />
                        </TabContainer>
                        <TabContainer>
                            {/* This will contain the monthly view */}
                        </TabContainer>
                        <TabContainer>
                            {/* This will contain the yearly view */}
                        </TabContainer>
                    </SwipeableViews>
                </Grid>
            </Grid>
        )
    }
}

export default connect()(DisplayGraph);