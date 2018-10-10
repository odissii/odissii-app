import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

const moment = require('moment');

class DisplayFeedback extends Component {
    render() {
        
        return (
            <TableRow>
                <TableCell><Avatar>{(this.props.feedback.quality).charAt(0)}</Avatar></TableCell>
                <TableCell>{this.props.feedback.details}</TableCell>
                <TableCell>{moment(this.props.feedback.date_created).format("MMM Do YYYY")}</TableCell>
            </TableRow>
        )
    }
}

export default connect()(DisplayFeedback);