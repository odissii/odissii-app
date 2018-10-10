import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class DisplayFeedback extends Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.feedback.date_created}</TableCell>
                <TableCell>{this.props.feedback.quality}</TableCell>
                <TableCell>{this.props.feedback.details}</TableCell>
            </TableRow>
        )
    }
}

export default connect()(DisplayFeedback);