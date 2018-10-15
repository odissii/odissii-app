import React, { Component } from 'react';
import { connect } from 'react-redux';
//Chart
import { Doughnut } from 'react-chartjs-2';

class DisplayOverallGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qualityCount: [],
            employeeSummary: {
                labels: ['Praise', 'Instruct', 'Correct'],
                datasets: [{
                    data: [this.props.totalFeedback.praise, this.props.totalFeedback.instruct, this.props.totalFeedback.correct],
                    backgroundColor: ['#0f77e6', '#f17416', 'lightgray'],
                }]
            },
        }; //end of this.state
    } //end of constructor

    render() {
        return (
            <Doughnut data={this.state.employeeSummary} />
        ) //end of return
    } //end of render
} //end of DisplayOverallGraph

export default connect()(DisplayOverallGraph);