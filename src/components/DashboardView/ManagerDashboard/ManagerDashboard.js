import React from 'react';
import { Typography, Grid } from '@material-ui/core'; 
import {Bar, Doughnut} from 'react-chartjs-2';
const barOptions = {
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
  labels: ['Erin', 'Keith', 'Ben', 'Maria', 'Mike'],
  datasets: [
    {
      label: 'Correct',
      backgroundColor: 'lightgray',
      data: [1, 5, 2, 1, 3]
    },
    {
      label: 'Instruct',
      backgroundColor: '#f17416',
      data: [2, 3, 1, 4, 1]
    },
    {
      label: 'Praise',
      backgroundColor: '#0f77e6',
      data: [4, 1, 4, 5, 2]
  },
]}
const supervisorSummary = {
    labels: ['Praise', 'Instruct', 'Correct'],
    datasets: [{
      data: [4, 2, 1],
      backgroundColor: ['#0f77e6', '#f17416', 'lightgray']
    }]
}
class ManagerDashboard extends React.Component {
  render(){
    return (
      <div>
          <Typography variant="display1">Manager's Dashboard</Typography>
          <Bar data={managerOverview} options={barOptions}/>
          <Typography variant="headline">Manager List</Typography>
      
      {/* this will be mapped from an array that contains all supervisors that this person oversees */}
      <Grid container spacing={0}>
          <Grid item xs={6}>
          Erin <br/>
          <a href="#summary">Summary</a><br/>
          <a href="#summary">Employees</a>
          </Grid>
          <Grid item xs={6}>
          <Doughnut data={supervisorSummary}/>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default ManagerDashboard;