import React from 'react';
import { Grid } from '@material-ui/core'; 
import IndividualManagerGraph from './Graphs/IndividualManagerGraph';
import ManagerOverviewGraph from './Graphs/ManagerOverviewGraph'; 
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  people: state.people,
  feedback: state.feedback,
  graphFeedback: state.feedback.supervisorOverview
});

class ManagerDashboard extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        supervisors: [],
        feedbackData: [],
        totalFeedback: [], 
        praise: [],
        correct: [],
        instruct: []
      }
  }
  componentWillMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getSupervisors(); 
    this.getTotalSupervisorFeedback(); 
  }
  getSupervisors = () => {
    axios({
      method: 'GET',
      url: '/api/staff/supervisors'
    }).then((response) => {
      console.log(response.data); 
      this.setState({
        supervisors: response.data
      });
      this.getSupervisorFeedbackReports(response.data); 
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  getTotalSupervisorFeedback = () => {
    axios({
      method: 'GET',
      url: '/api/feedback/supervisors/all'
    }).then((response) => {
      this.setState({
        totalFeedback: response.data
      });
      this.sortData();
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  getFeedbackCounts = (id) => {
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/count?id=${id}`
    }).then((response) => {
      this.setState({
        feedbackData: [...this.state.feedbackData, response.data]
      });
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  getSupervisorFeedbackReports = (array) => {
    for (let i = 0; i < array.length; i++){
      let id = array[i].supervisor_id; 
      this.getFeedbackCounts(id); 
    }
  }
  sortData = () => {
    for(let i = 0; i < this.state.totalFeedback.length; i++){
        if(this.state.totalFeedback[i].praise){
          this.setState({
            praise: [...this.state.praise, parseInt(this.state.totalFeedback[i].praise)]
          })   
        }
        if(this.state.totalFeedback[i].correct){
          this.setState({
            correct: [...this.state.correct, parseInt(this.state.totalFeedback[i].correct)]
          })
        }
        if(this.state.totalFeedback[i].instruct){
          this.setState({
            instruct: [...this.state.instruct, parseInt(this.state.totalFeedback[i].instruct)]
          })
        }
    }
}
  render(){
    return (
      <div>
          <h1>Manager's Dashboard</h1>
              <ManagerOverviewGraph praise={this.state.praise} correct={this.state.correct} instruct={this.state.instruct}/> 
          <h2>Manager List</h2>
      <Grid container spacing={0}>
          <Grid item xs={10}>
                      {this.state.feedbackData.map((array, i) => {
                        return(
                        <div key={i}>
                          <span>{array.map((feedback)=> {
                              return(
                                <div key={feedback.sid}>
                                <h3>{feedback.first_name} {feedback.last_name}</h3> 
                                <a href="#summary">Summary</a><br/>
                                  <a href="#employees">Employees</a>
                                <IndividualManagerGraph feedback={feedback} key={i}/> 
                                </div>
                              );
                            })}
                          </span>
                        </div>
                      );
                  })} 
              </Grid>
          </Grid>
        </div>
    );
  }
}
export default connect(mapStateToProps)(ManagerDashboard);