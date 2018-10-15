import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../DisplayFeedback/DisplayFeedback.css';
//Material Table
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
//In-line Styling
import { withStyles } from '@material-ui/core/styles';
//Material avatar & icons
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
//Date formatter
const moment = require('moment');

//This is the in-line styling for the avatars
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
}; //end of styles

class DisplayFeedback extends Component {
    render() {

        //This is how the avatar icon changes according to the category name of the feedback
        let content = null;
        if (this.props.feedback.name === 'Praise') {
            content = <TableCell><Avatar style={styles.praiseAvatar}><Icon>done</Icon></Avatar></TableCell>
        } else if (this.props.feedback.name === 'Correct') {
            content = <TableCell><Avatar style={styles.correctAvatar}><Icon>clear</Icon></Avatar></TableCell>
        } else if (this.props.feedback.name === 'Instruct') {
            content = <TableCell><Avatar style={styles.instructAvatar}><Icon>remove</Icon></Avatar></TableCell>
        }; //end of if-else

        return (
            <TableRow>
                {/* {content} is coming from the changing avatar icon logic */}
                { content }
                {/* This is how the details of the feedback are only displaying up to a certain
                character length instead of the whole feedback displaying */}
                <TableCell>{this.props.feedback.details.slice(0,15)}...</TableCell>
                {/* This is how the date is formatted coming back from the server */}
                <TableCell>{moment(this.props.feedback.date_created).format("MM/DD/YY")}</TableCell>
            </TableRow>
        ) //end of return
    } //end of render
} //end of DisplayFeedback

export default withStyles(styles)(connect()(DisplayFeedback));