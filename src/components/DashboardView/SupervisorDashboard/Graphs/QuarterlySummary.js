import React from 'react';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';

// REACT COMPONENT
const QuarterlySummary = props => (
  <Doughnut data={
      {
        labels: ['Praise', 'Instruct', 'Correct'],
        datasets: [{
          data: feedbackQualityForCurrentQuarter(props.data),
          backgroundColor: ['#0f77e6', '#f17416', 'lightgray']
        }]
      }
      
    } 
  />
);

export default QuarterlySummary;

// reduces the feedback down into an array with three numbers,
// representing the amount of praise, instruct, or correct
// for the current quarter
const feedbackQualityForCurrentQuarter = feedback => {
  const currentQuarter = moment().quarter();
  // const startOfQuarter = getStartingMonthOfCurrentQuarter(currentMonth);

  const quality = feedback.reduce((summary, entry) => {
    if (moment(entry.date_created).quarter() === currentQuarter) {
      summary[entry.quality] += 1;
    }
    return summary
  }, {
    praise: 0,
    instruct: 0,
    correct: 0
  });

  return Object.values(quality);
};