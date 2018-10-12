import React from 'react';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../../constants';
import { FormControl, Select, MenuItem, OutlinedInput, InputLabel } from '@material-ui/core';
import '../employee.css';

const mapStateToProps = state => ({
    user: state.user,
    filter: state.filter,
})

const styles = {
    formControl: {
        // height: 30,
        width: 200,
    }
}

class EmployeeFilter extends React.Component {

    handleChange = (event) => {
        this.props.dispatch({ type: 'ADD_FILTER', payload: event.target.value });
    }

    render() {
        return (
            <form className="filter">
                    <FormControl variant="outlined" style={styles.formControl}>
                    <InputLabel>Filter By:</InputLabel>
                        <Select
                            value={this.props.filter}
                            onChange={this.handleChange}
                            >
                            <MenuItem value="date">Date of Last Feedback</MenuItem>
                            <MenuItem value="feedback">Least Feedback</MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                        </Select>
                    </FormControl>
                </form>
        )
    }
}

export default connect(mapStateToProps)(EmployeeFilter);