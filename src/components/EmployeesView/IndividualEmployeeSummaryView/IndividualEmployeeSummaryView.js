import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Chart from 'chart.js';



class IndividualEmployeeSummaryView extends Component {


    render() {
        let stackedBar = new Chart({
            type: 'bar',
            data: [1, 2, 3],
            options: {
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                }
            }
        });
        return(
            <div>
                { stackedBar }
            </div>
        )
    }
}

export default connect()(IndividualEmployeeSummaryView);