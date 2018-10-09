import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 
import 

class ManagerDashboard extends React.Component {
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
          <div className="graphPlaceholder">graph of all managers' feedback</div>
          <Typography variant="headline">Manager List</Typography>
      
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      <Grid container spacing={0}>
          <Grid item xs={6}>
          Manager 1 <br/>
          <a href="#summary">Summary</a><br/>
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