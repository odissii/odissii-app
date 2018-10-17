import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QUALITY_ACTIONS } from '../../../../../redux/actions/qualityActions';
//Chart
import { Bar } from 'react-chartjs-2';
//Date formatter
const moment = require('moment');

// const mapStateToProps = state => ({
//     quality_types: state.quality_types
// });

// const lastFourWeeksOnly = feedback => moment(feedback.date_created).isAfter(moment().subtract(4, 'weeks').startOf('isoWeek'));

// const getIdForQuality = (types, name) => types.find(type => type.name === name).id;

// const totalsByWeek = (feedback, quality_types) => {
//     const weekFourStart = moment().subtract(4, 'weeks').startOf('isoWeek');
//     const weekThreeStart = moment().subtract(3, 'weeks').startOf('isoWeek');
//     const weekTwoStart = moment().subtract(2, 'weeks').startOf('isoWeek');
//     const weekOneStart = moment().subtract(1, 'weeks').startOf('isoWeek');
//     const thisWeekStart = moment().startOf('isoWeek');

//     const blankSummary = quality_types.reduce((summary, quality) => {
//         summary[quality.id] = 0;
//         return summary;
//     }, {});

//     return feedback.reduce((summary, entry) => {
//         const date = moment(entry.date_created);
//         if (date.isBetween(weekFourStart, weekThreeStart)) {
//             summary.fourWeeksAgo[entry.id] += 1;
//         } else if (date.isBetween(weekThreeStart, weekTwoStart)) {
//             summary.threeWeeksAgo[entry.id] += 1;
//         } else if (date.isBetween(weekTwoStart, weekOneStart)) {
//             summary.twoWeeksAgo[entry.id] += 1;
//         } else if (date.isBetween(weekOneStart, thisWeekStart)) {
//             summary.oneWeekAgo[entry.id] += 1;
//         }
//         return summary;
//     }, ({
//         fourWeeksAgo: { ...blankSummary },
//         threeWeeksAgo: { ...blankSummary },
//         twoWeeksAgo: { ...blankSummary },
//         oneWeekAgo: { ...blankSummary },
//     }));
// };

// const qualityByMonth = (totals, qualityId) => Object.values(totals).map(month => month[qualityId]);

class DisplayAnnuallyGraph extends Component {
//     componentDidMount() {
//         if (!this.props.quality_types.length) {
//             this.props.dispatch({ type: QUALITY_ACTIONS.FETCH_FEEDBACK_QUALITY_CATEGORIES })
//         }
//     }

    render() {
//         const { quality_types, data } = this.props;

//         if (!(quality_types.length && data.length)) return null;

//         const monthlyTotals = totalsByMonth(data, quality_types);

//         const options = {
//             scales: {
//                 xAxes: [{
//                     stacked: true
//                 }],
//                 yAxes: [{
//                     stacked: true
//                 }]
//             },
//         }

//         let barData = {
//             datasets: [{
//                 label: 'Praise',
//                 data: qualityByMonth(monthlyTotals, getIdForQuality(quality_types, 'Praise')),
//                 backgroundColor: '#0f77e6',
//             },
//             {
//                 label: 'Instruct',
//                 data: qualityByMonth(monthlyTotals, getIdForQuality(quality_types, 'Instruct')),
//                 backgroundColor: '#f17416',
//             },
//             {
//                 label: 'Correct',
//                 data: qualityByMonth(monthlyTotals, getIdForQuality(quality_types, 'Correct')),
//                 backgroundColor: 'lightgrey',
//             }],
//             labels: weekNames,
//         }
        return (
            <div>
                {/* {JSON.stringify(this.props.data)}
                {JSON.stringify(fourWeeksFeedback)}
                {JSON.stringify(quality_types)}
                {JSON.stringify(weeklyQualityTotals)} */}
                <Bar
                    // data={1}
                    // options={}
                />
            </div>
        )
    }
}

export default connect()(DisplayAnnuallyGraph);