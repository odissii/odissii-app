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
  }
  const managerOverview = {
    labels: ['Erin', 'Keith', 'Ben', 'Maria', 'Mike'],
    datasets: [
      {
        label: 'Correct',
        backgroundColor: 'lightgray',
        data: [1, 5, 2, 1, 3]
      },
      {
        label: 'Instruct',
        backgroundColor: '#f17416',
        data: [2, 3, 1, 4, 1]
      },
      {
        label: 'Praise',
        backgroundColor: '#0f77e6',
        data: [4, 1, 4, 5, 2]
    },
  ]}
class ManagerOverviewGraph extends Component {
    render(){
        return(
            <div>
                <Bar data={managerOverview} options={barOptions}/>
            </div>
        );
    }
}
export default ManagerOverviewGraph; 