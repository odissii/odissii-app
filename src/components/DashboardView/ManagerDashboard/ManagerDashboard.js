import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 
import {Bar} from 'react-chartjs-2';
const options = {
  scales: {
       xAxes: [{
           stacked: true
       }],
       yAxes: [{
           stacked: true
       }]
   }, 
}
const managerOverview = {
  labels: ['Erin', 'Keith', 'Ben'],
  datasets: [
    {
      label: 'Correct',
      backgroundColor: '#ff0000',
      data: [1, 5, 2]
    },
    {
      label: 'Instruct',
      backgroundColor: '#ffcc00',
      data: [2, 3, 1]
    },
    {
      label: 'Praise',
      backgroundColor: '#1dd043',
      data: [4, 1, 4]
  },
]
}
class ManagerDashboard extends React.Component {
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
          <Bar data={managerOverview} options={options}/>
          <Typography variant="headline">Manager List</Typography>
      
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      <Grid container spacing={0}>
          <Grid item xs={6}>
          Manager 1 <br/>
          <a href="#summary">Summary</a><br/>
          <a href="#summary">Employees</a>
          </Grid>
          <Grid item xs={6}>
          
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default ManagerDashboard;