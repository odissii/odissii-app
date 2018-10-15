import React from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';

const barOptions = {
  scales: {
    xAxes: [{
        stacked: true
    }],
    yAxes: [{
        stacked: true
    }]
  }, 
};

// REACT COMPONENT
const PastThreeWeeks = props => {
  const weekNames = namesOfPastThreeWeeks();
  // console.log('week names:', weekNames);
  const threeWeeksFeedback = props.data.filter(feedback => moment(feedback.date_created).isAfter(moment().subtract(3, 'weeks').startOf('isoWeek')));
  // console.log('three weeks:', threeWeeksFeedback);
  const totals = totalsByWeek(threeWeeksFeedback);
  // console.log('totals:', totals);

  const data = {
    labels: weekNames,
    datasets: [
      {
        label: 'Correct',
        backgroundColor: 'lightgray',
        data: qualityByWeek(totals, 'correct')
      },
      {
        label: 'Instruct',
        backgroundColor: '#f17416',
        data: qualityByWeek(totals, 'instruct')
      },
      {
        label: 'Praise',
        backgroundColor: '#0f77e6',
        data: qualityByWeek(totals, 'praise')
      },
    ]
  };

  return <Bar data={data} options={barOptions} />;
};

export default PastThreeWeeks;



const blankSummary = {
  praise: 0,
  instruct: 0,
  correct: 0
};

const totalsByWeek = feedback => {
  const weekThreeStart = moment().subtract(3, 'weeks').startOf('isoWeek');
  const weekTwoStart = moment().subtract(2, 'weeks').startOf('isoWeek');
  const weekOneStart = moment().subtract(1, 'weeks').startOf('isoWeek');
  const thisWeekStart = moment().startOf('isoWeek');

  // console.log(weekThreeStart, weekTwoStart, weekOneStart, thisWeekStart);

  return feedback.reduce((summary, entry) => {
    const date = moment(entry.date_created);
    // console.log('date:', date);
    if (date.isBetween(weekThreeStart, weekTwoStart)) {
      summary.threeWeeksAgo[entry.quality] += 1;
    } else if (date.isBetween(weekTwoStart, weekOneStart)) {
      summary.twoWeeksAgo[entry.quality] += 1;
    } else if (date.isBetween(weekOneStart, thisWeekStart)) {
      summary.oneWeekAgo[entry.quality] += 1;
    }

    return summary;
  }, ({
    threeWeeksAgo: {...blankSummary},
    twoWeeksAgo: {...blankSummary},
    oneWeekAgo: {...blankSummary},
  }));
};

// get the names of the past three whole weeks from now, ie: "Oct 12"
const namesOfPastThreeWeeks = () => ([
  moment().subtract(3, 'weeks').startOf('isoWeek').format('MMM DD'),
  moment().subtract(2, 'weeks').startOf('isoWeek').format('MMM DD'),
  moment().subtract(1, 'weeks').startOf('isoWeek').format('MMM DD'),
]);

// get the tally objects for each week and return an array with only the values for a specific quality
const qualityByWeek = (totals, quality) => Object.values(totals).map(week => week[quality]);



// moment().subtract(3, 'week').startOf('isoWeek').format('MMM DD')