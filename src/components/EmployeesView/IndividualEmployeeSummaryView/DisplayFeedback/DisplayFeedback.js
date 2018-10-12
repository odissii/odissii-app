import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../DisplayFeedback/DisplayFeedback.css';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

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

        let content = null;
        if (this.props.feedback.name === 'Praise') {
            content = <TableCell><Avatar style={styles.praiseAvatar}><Icon>done</Icon></Avatar></TableCell>
        } else if (this.props.feedback.name === 'Correct') {
            content = <TableCell><Avatar style={styles.correctAvatar}><Icon>clear</Icon></Avatar></TableCell>
        } else if (this.props.feedback.name === 'Instruct') {
            content = <TableCell><Avatar style={styles.instructAvatar}><Icon>remove</Icon></Avatar></TableCell>
        }

        return (
            <TableRow>
                { content }
                <TableCell>{this.props.feedback.details}</TableCell>
                <TableCell>{moment(this.props.feedback.date_created).format("MM/DD/YY")}</TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(connect()(DisplayFeedback));