import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

const barOptions = {
    scales: {
         xAxes: [{
             stacked: true
         }],
         yAxes: [{
             stacked: true
         }]
     }, 
  };

class ManagerOverviewGraph extends Component {
    render(){
    let  managerOverview = {
        labels: this.props.supervisors,
        datasets: [
          {
            label: 'Correct',
            backgroundColor: 'lightgray',
            data: this.props.correct
          },
          {
            label: 'Instruct',
            backgroundColor: '#f17416',
            data: this.props.instruct
          },
          {
            label: 'Praise',
            backgroundColor: '#0f77e6',
            data: this.props.praise
        }
      ]}
        return(
            <div>
                {JSON.stringify(this.props.supervisors)}
                <Bar data={managerOverview} options={barOptions}/>
            </div>
        );
    }
}
export default ManagerOverviewGraph; 