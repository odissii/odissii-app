import React, { Component } from 'react';
import { connect } from 'react-redux';
//Chart
import { Bar } from 'react-chartjs-2';
//Date formatter
const moment = require('moment');

class DisplayWeeklyGraph extends Component {
    
    render() {

        const blankSummary = {
            praise: 0,
            instruct: 0,
            correct: 0
        }



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
                data: [this.props.data.name === 'Praise'],
                backgroundColor: '#0f77e6',
                borderWidth: 1,
                stack: '1'
            },
            {
                label: 'Instruct',
                data: [this.props.data.name === 'Instruct'],
                backgroundColor: '#f17416',
                borderWidth: 1,
                stack: '2'

            },
            {
                label: 'Correct',
                data: [this.props.data.name === 'Correct'],
                backgroundColor: 'lightgrey',
                borderWidth: 1,
                stack: '3'
            }],
            labels: []
        }
        return (
            <div>
                {JSON.stringify(this.props.data)}
                <Bar
                    data={data}
                    options={options}
                />
            </div>
        )
    }
}

export default connect()(DisplayWeeklyGraph);