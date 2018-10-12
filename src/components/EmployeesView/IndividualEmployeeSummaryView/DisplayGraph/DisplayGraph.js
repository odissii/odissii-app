import React, { Component } from 'react';
import { connect } from 'react-redux';
//Chart
import { Bar } from 'react-chartjs-2';

class DisplayGraph extends Component {
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
                data: [this.props.quality.praise],
                backgroundColor: '#0f77e6',
                borderWidth: 1,
            },
            {
                label: 'Instruct',
                data: [this.props.quality.instruct],
                backgroundColor: '#f17416',
                borderWidth: 1,
                stack: '2'

            },
            {
                label: 'Correct',
                data: [this.props.quality.correct],
                backgroundColor: 'lightgrey',
                borderWidth: 1,
                stack: '3'
            }],
            labels: ['label']
        }
        return (
            <Bar
                data={data}
                options={options}
            />
        )
    }
}

export default connect()(DisplayGraph);