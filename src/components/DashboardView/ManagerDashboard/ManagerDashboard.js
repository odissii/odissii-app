import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 
import IndividualManagerGraph from './Graphs/IndividualManagerGraph';
import ManagerOverviewGraph from './Graphs/ManagerOverviewGraph'; 

class ManagerDashboard extends React.Component {
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
              <ManagerOverviewGraph/>
          <Typography variant="headline">Manager List</Typography>
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      <Grid container spacing={0}>
          <Grid item xs={7}>
            <Typography variant="subheading">Erin</Typography>
            <a href="#summary">Summary</a><br/>
            <a href="#summary">Employees</a>
            </Grid>
          <Grid item xs={5}>
            <IndividualManagerGraph />
          </Grid>
      </Grid>
    </div>
    );
  }
}
export default ManagerDashboard;