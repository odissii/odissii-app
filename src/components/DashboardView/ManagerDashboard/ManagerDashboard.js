import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 
import IndividualManagerGraph from './Graphs/IndividualManagerGraph';
import ManagerOverviewGraph from './Graphs/ManagerOverviewGraph'; 
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  people: state.people,
  feedback: state.feedback
});
class ManagerDashboard extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        supervisors: [],
        feedbackData: []
      }
  }
  componentDidMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getSupervisors(); 
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
  getFeedbackCounts = (id) => {
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/count?id=${id}`
    }).then((response) => {
      console.log(...response.data); 
      this.setState({
        feedbackData: [...this.state.feedbackData, response.data]
      });
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  getSupervisorFeedbackReports = (array) => {
    console.log(array);
    for (let i = 0; i < array.length; i++){
      let id = array[i].supervisor_id; 
      this.getFeedbackCounts(id); 
    }
  }
 
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
              <ManagerOverviewGraph /> 
          <Typography variant="headline">Manager List</Typography>
      <Grid container spacing={0}>
          <Grid item xs={10}>
          {this.state.supervisors.map((supervisor, i)=>{
            return (
              <div>
                <Typography variant="subheading" key={i}>{supervisor.first_name} {supervisor.last_name}</Typography> 
                <a href="#summary">Summary</a><br/>
                  <a href="#employees">Employees</a>
                      {this.state.feedbackData.map((array, i) => {
                        return(
                          <span key={i}>{array.map((feedback, i)=> {
                            if (feedback.last_name === supervisor.last_name && feedback.first_name === supervisor.first_name)
                              return(
                                <IndividualManagerGraph feedback={feedback} key={i}/> 
                              );
                            })}
                            </span>
                        );
                      })}
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