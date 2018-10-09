import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 

class ManagerDashboard extends React.Component {
  render(){
    return (
      <div>
          <Typography variant="headline">Manager's Dashboard</Typography>
          <div>graph of all managers' feedback</div>
          <Typography variant="headline">Manager List</Typography>
      
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      <Grid container spacing={0}>
          <Grid item xs={6}>
          Manager 1 
          <a href="#summary">Summary</a>
          <a href="#summary">Employees</a>
          </Grid>
          <Grid item xs={6}>
          <div>graph</div>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default ManagerDashboard;