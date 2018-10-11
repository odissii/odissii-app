import React, {Component} from 'react';
import { Doughnut } from 'react-chartjs-2';

 
class IndividualManagerGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            supervisorSummary: {
                labels: ['Praise', 'Instruct', 'Correct'],
                datasets: [{
                data: [parseInt(this.props.feedback.praise), parseInt(this.props.feedback.instruct), parseInt(this.props.feedback.correct)],
                backgroundColor: ['#0f77e6', '#f17416', 'lightgray']
                }]
            },
        }
    }
    render(){
        return(
            <div>
                {JSON.stringify(this.props.feedback)}
                <Doughnut data={this.state.supervisorSummary}/>
            </div>
        );
    }
}
export default IndividualManagerGraph; 