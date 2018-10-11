import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../DisplayFeedback/DisplayFeedback.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const moment = require('moment');

const styles = {
    avatar: {
        margin: 10,
    },
    praiseAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#0f77e6',
    },
    correctAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: 'lightgrey',
    },
    instructAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: '#f17416',
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
};

class DisplayFeedback extends Component {
    render() {
        let iconQuality = 'Praise';
        if (this.props.feedback.quality === 'Correct') {     
            iconQuality = 'correct';
            console.log('correct', iconQuality);

        } else if (this.props.feedback.quality === 'Instruct') {
            iconQuality = 'instruct';
            console.log('instruct', iconQuality);
        }

        return (
            <TableRow>
                <TableCell><Avatar className={iconQuality}>{(this.props.feedback.name).charAt(0)}</Avatar></TableCell>
                <TableCell>{this.props.feedback.details}</TableCell>
                <TableCell>{moment(this.props.feedback.date_created).format("MMM Do YYYY")}</TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(connect()(DisplayFeedback));