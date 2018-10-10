import React from 'react';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../../constants';
import { FormControl, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import '../employee.css';

const mapStateToProps = state => ({
    user: state.user,
})

const styles = {
    formControl: {
        height: 20,
        width: 150,
    }
}

class EmployeeFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
        }
    }
    render() {
        let content = null;
        if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
            content = (
                <form className="filter">
                    <FormControl variant="outlined" style={styles.formControl}>
                        <Select
                            value={this.state.filter}
                            onChange={this.handleChange}
                            input={<OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name="filter" />}>
                            <MenuItem value="" disabled>Filter By:</MenuItem>
                            <MenuItem>Date of Last Feedback</MenuItem>
                            <MenuItem>Least Feedback</MenuItem>
                            <MenuItem>Most Feedback</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            )
        } else if (this.props.user && this.props.user.role === 'manager') {
            content = (
                <form>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <Select
                            value={this.state.filter}
                            onChange={this.handleChange}
                            input={<OutlinedInput
                                labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
                                name="filter" />}>
                            <MenuItem value="" disabled>Filter By:</MenuItem>
                            <MenuItem>Date of Last Feedback</MenuItem>
                            <MenuItem>Least Feedback</MenuItem>
                            <MenuItem>Most Feedback</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            )
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(EmployeeFilter);