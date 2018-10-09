import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';

const supervisorSummary = {
    labels: ['Praise', 'Instruct', 'Correct'],
    datasets: [{
      data: [4, 2, 1],
      backgroundColor: ['#0f77e6', '#f17416', 'lightgray']
    }]
}
class IndividualManagerGraph extends Component {
    render(){
        return(
            <div>
                <Doughnut data={supervisorSummary}/>
            </div>
        );
    }
}
export default IndividualManagerGraph; 