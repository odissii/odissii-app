import React from 'react';
import { Grid, IconButton, Button } from '@material-ui/core'; 
import { Edit } from '@material-ui/icons';
import IndividualManagerGraph from './Graphs/IndividualManagerGraph';
import ManagerOverviewGraph from './Graphs/ManagerOverviewGraph'; 
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../../redux/actions/userActions';
import axios from 'axios';
import './ManagerDashboard.css';
import {CSVLink} from 'react-csv';
import moment from 'moment';

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
        sortedSupervisors: [],
        feedbackData: [],
        totalFeedback: [], 
        reports: [],
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
      console.log(response.data); 
      this.setState({
        supervisors: response.data
      });
      this.getSupervisorFeedbackReports(response.data); 
      this.sortSupervisors();
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  getFeedbackCounts = (id) => {
    let today = new Date();
    let end = moment(today).format('L');
    let start = moment(today).subtract(1, 'year').format('L');  
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/count?id=${id}&start=${start}&end=${end}`
    }).then((response) => {
      this.setState({
        feedbackData: [...this.state.feedbackData, response.data], 
        totalFeedback: response.data
      });
        this.sortData(); 
      
      }).catch((error) => {
      console.log('Error getting feedback counts', error); 
    })
  }
  getFeedbackDetails = (id) => {
    axios({
      method: 'GET',
      url: `/api/feedback/supervisors/reports?id=${id}`
    }).then((response) => {
      this.setState({
          reports: [...this.state.reports, response.data]
        });
      }).catch((error) => {
      console.log('Error getting feedback details', error); 
    })
  }
  getSupervisorFeedbackReports = (array) => {
    for (let i = 0; i < array.length; i++){
      let id = array[i].supervisor_id; 
      this.getFeedbackCounts(id); 
      this.getFeedbackDetails(id);
    }
  }
  sortSupervisors = () => {
    for(let i = 0; i < this.state.supervisors.length; i++){
      console.log(this.state.supervisors[i]);
      this.setState({
        sortedSupervisors: [...this.state.sortedSupervisors, this.state.supervisors[i].first_name + ' ' + this.state.supervisors[i].last_name,]
      })
    }
  }
  sortData = () => {
    for(let i = 0; i < this.state.totalFeedback.length; i++){
          this.setState({
            praise: [...this.state.praise, parseInt(this.state.totalFeedback[i].praise)],
            correct: [...this.state.correct, parseInt(this.state.totalFeedback[i].correct)],
            instruct: [...this.state.instruct, parseInt(this.state.totalFeedback[i].instruct)],
          })   
        }
    }
    
  render(){
    return (
      <div className="padding-bottom">
      {JSON.stringify(this.state.reports)}
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
                {this.state.feedbackData.map((array, i) => {
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
                                      {this.state.reports.map((report, k) => {
                                         return (
                                           <span key={k}>{report.map((supervisorReport, l) => {
                                            if(supervisorReport.supervisor_id === feedback.sid)
                                              return (
                                                <CSVLink key={l} data={report}
                                                  filename={`${supervisorReport.supervisor}-feedback.csv`}
                                                  target="_blank">
                                                  Download CSV
                                            </CSVLink>
                                              );
                                          })}
                                    </span>
                                  );
                                })}
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