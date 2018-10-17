import React, { Component } from 'react';
import { connect } from 'react-redux';
//Chart
import { Bar } from 'react-chartjs-2';
//Date formatter
const moment = require('moment');


class DisplayQuarterlyGraph extends Component {
    render() {
        const options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            },
        }

        let data = {
            datasets: [{
                label: 'Praise',
                data: [this.props.praise, this.props.instruct, this.props.correct],
                backgroundColor: '#0f77e6',
                borderWidth: 1,
                stack: '1'
            },
            {
                label: 'Instruct',
                data: [this.props.instruct],
                backgroundColor: '#f17416',
                borderWidth: 1,
                stack: '2'

            },
            {
                label: 'Correct',
                data: [this.props.correct],
                backgroundColor: 'lightgrey',
                borderWidth: 1,
                stack: '3'
            }],
            labels: []
        }
        return (
            <Bar
                data={data}
                options={options}
            />
        )
    }
}

export default connect()(DisplayQuarterlyGraph);