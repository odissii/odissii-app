import React from 'react';
import { Grid, IconButton, Button } from '@material-ui/core'; 
import { Edit } from '@material-ui/icons';
import IndividualManagerGraph from './Graphs/IndividualManagerGraph';
import ManagerOverviewGraph from './Graphs/ManagerOverviewGraph'; 
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { PEOPLE_ACTIONS } from '../../../redux/actions/peopleActions'; 
import { FEEDBACK_ACTIONS } from '../../../redux/actions/feedbackActions';
import axios from 'axios';
import './ManagerDashboard.css';
import {CSVLink} from 'react-csv';
import moment from 'moment';

const mapStateToProps = state => ({
  user: state.user,
  people: state.people,
  feedback: state.feedback.feedback.feedbackCountsByAllSupervisors,
  detailedFeedback: state.feedback.feedback.feedbackDetailsByAllSupervisors
});

class ManagerDashboard extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        sortedSupervisors: [],
        praise: [],
        correct: [],
        instruct: []
      }
  }
  componentWillMount(){
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getSupervisors(); 
  }
  editPerson = (id) => {
    this.props.history.push(`/edit/supervisor/${id}`);
  }
  getSupervisors = () => {
    axios({
      method: 'GET',
      url: '/api/staff/supervisors'
    }).then((response) => {
      this.props.dispatch({type: PEOPLE_ACTIONS.SET_SUPERVISORS, payload: response.data});
      this.getSupervisorFeedbackReports(response.data); 
      this.sortSupervisors(response.data);
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  //this gets the past twelve months of feedback counting how many praise, instruct, and correct feedback each supervisor has given 
  getFeedbackCounts = (id) => {
    let today = new Date();
    let end = moment(today).format('L');
    let start = moment(today).subtract(1, 'year').format('L');  
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/count?id=${id}&start=${start}&end=${end}`
    }).then((response) => {
      this.props.dispatch({type: FEEDBACK_ACTIONS.SET_ALL_FEEDBACK_BY_MANAGER_SUPERVISORS, payload: response.data});
        this.sortData(response.data); 
      }).catch((error) => {
      console.log('Error getting feedback counts', error); 
    })
  }
  //this gets more detailed reports about each feedback given by a supervisor, breaking each record down into employee, the details given, and the quality of the feedback
  //this data is used in a CSV file which can be downloaded by a manager 
  getFeedbackDetails = (id) => {
      let today = new Date();
      let end = moment(today).format('L');
      let start = moment(today).subtract(1, 'year').format('L');  
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/reports?id=${id}&start=${start}&end=${end}`
    }).then((response) => {
      this.props.dispatch({type: FEEDBACK_ACTIONS.SET_ALL_DETAILED_FEEDBACK_BY_MANAGER_SUPERVISORS, payload: response.data, supervisor: id});
      }).catch((error) => {
      console.log('Error getting feedback details', error); 
    })
  }
  //this sorts the feedback and extracts each supervisor ID to send to two functions which GET two sets of feedback data 
  getSupervisorFeedbackReports = (array) => {
    for (let i = 0; i < array.length; i++){
      let id = array[i].supervisor_id; 
      this.getFeedbackCounts(id); 
      this.getFeedbackDetails(id);
    }
  }
  sortSupervisors = (array) => {
    for(let i = 0; i < array.length; i++){
      this.setState({
        sortedSupervisors: [...this.state.sortedSupervisors, array[i].first_name + ' ' + array[i].last_name]
      })
    }
  }
  sortData = (array) => {
    for(let i = 0; i < array.length; i++){
          this.setState({
            praise: [...this.state.praise, parseInt(array[i].praise)],
            correct: [...this.state.correct, parseInt(array[i].correct)],
            instruct: [...this.state.instruct, parseInt(array[i].instruct)],
          })   
        }
    }
  render(){
    return (
      <div className="padding-bottom">
      {JSON.stringify(this.props.feedback)}
        <Grid container spacing={0}>
        <Grid item xs={12}>
          <h1>Manager's Dashboard</h1>
            <p className="center">Feedback given past 12 months</p>
            </Grid>
            <Grid item xs={12}>
              <ManagerOverviewGraph supervisors={this.state.sortedSupervisors} praise={this.state.praise} correct={this.state.correct} instruct={this.state.instruct}/> 
            </Grid>
          <Grid item xs={12}>
              <h2 className="center">All Supervisors</h2>
          </Grid>
                {this.props.feedback.map((array, i) => {
                        return(
                        <div key={i}>
                         {array.map((feedback, j)=> {
                              return(
                              <Grid item xs={12} lg={8} key={j}>
                                <div className="card">
                                      <h3>{feedback.first_name} {feedback.last_name} <IconButton onClick={()=> this.editPerson(feedback.sid)}><Edit/></IconButton></h3>
                                      <Button color ="primary" onClick={()=>this.props.history.push(`/view/supervisor/${feedback.sid}`)}>Summary</Button>
                                      <Button color ="primary" onClick={()=>this.props.history.push('/employees')}>Employees</Button>
                                       <p>Feedback given past 12 months</p>
                                        <IndividualManagerGraph feedback={feedback}/> 
                                        {this.props.detailedFeedback[feedback.sid] && <CSVLink data={this.props.detailedFeedback[feedback.sid]}
                                          filename={`${feedback.last_name}-feedback.csv`}
                                          target="_blank"
                                        >Download CSV</CSVLink>}
                              </div>
                        </Grid>
                      );
                  })} 
                  </div> 
              );
            })}
    </Grid>
    </div>
    );
  }
}
export default connect(mapStateToProps)(ManagerDashboard);