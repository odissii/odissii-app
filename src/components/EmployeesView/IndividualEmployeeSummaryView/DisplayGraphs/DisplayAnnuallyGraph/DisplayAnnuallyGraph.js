import React, { Component } from 'react';
import { connect } from 'react-redux';
//Chart
import { Bar } from 'react-chartjs-2';

class DisplayAnnuallyGraph extends Component {
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
                data: [1, 2, 3, 3, 4],
                backgroundColor: '#0f77e6',
                borderWidth: 1,
            },
            {
                label: 'Instruct',
                data: [1, 2, 3, 4, 5],
                backgroundColor: '#f17416',
                borderWidth: 1,
                stack: '2'

            },
            {
                label: 'Correct',
                data: [1],
                backgroundColor: 'lightgrey',
                borderWidth: 1,
                stack: '3'
            }],
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        }
        return (
            <Bar
                data={data}
                options={options}
            />
        )
    }
}

export default connect()(DisplayAnnuallyGraph);