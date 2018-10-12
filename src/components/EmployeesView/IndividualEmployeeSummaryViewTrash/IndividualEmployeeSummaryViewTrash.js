import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DisplayFeedback from './DisplayFeedback/DisplayFeedback';
import './IndividualEmployeeSummary.css';


//Buttons
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DisplayGraphs from './DisplayGraphs/DisplayGraphs';



const styles = theme => ({
    root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    },
    stickyButton: {
        bottom: '1rem',
    },
});

class IndividualEmployeeSummaryView extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         qualityCount: [],
    //         value: 0,
    //     };
    // } //end of constructor

    render() {
        let content = null;
        content = (
            <div className="outer">
                <div className="btnContainer">
                    <Button variant="fab" color="primary" aria-label="Edit" style={styles.stickyButton}
                        component={Link} to={"/feedback/new"}>
                        <Icon>edit_icon</Icon>
                    </Button>
                </div>
                <div className="container">
                    <h1>
                        <Button component={Link} to={"/employees"}>
                            <Icon>arrow_back</Icon>
                        </Button>
                        {/* {this.state.qualityCount[0] ? this.state.qualityCount[0].first_name : null} */}
                    </h1>
                    <DisplayGraphs />
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Feedback</TableCell>
                                    <TableCell>Date Given</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {JSON.stringify(this.props.feedback.currentEmployee)} */}
                                {this.props.feedback.currentEmployee.map((feedbacksAtIndex, index) => {
                                    return (
                                        <DisplayFeedback key={index} feedback={feedbacksAtIndex} />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        )

        return (
            <div>
                {content}
            </div>
        ) //end of return
    }
}

IndividualEmployeeSummaryView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(IndividualEmployeeSummaryView));