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
        supervisors: []
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
      this.setState({
        supervisors: response.data
      });
    }).catch((error) => {
      console.log('Error getting supervisors', error); 
    })
  }
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
              <ManagerOverviewGraph/>
          <Typography variant="headline">Manager List</Typography>
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      {/* will need either to get all of the feedback data here on the join, OR do another mapping inside here to get that data */}
      <Grid container spacing={0}>
          <Grid item xs={7}>
          {this.state.supervisors.map((supervisor, i)=>{
            return (
              <Typography variant="subheading" key={i}>{supervisor.first_name} {supervisor.last_name}</Typography>
            );
          })}
            <a href="#summary">Summary</a><br/>
            <a href="#employees">Employees</a>
            </Grid>
          <Grid item xs={5}>
            <IndividualManagerGraph />
          </Grid>
      </Grid>
    </div>
    );
  }
}
export default connect(mapStateToProps)(ManagerDashboard);