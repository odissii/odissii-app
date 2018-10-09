import React from 'react';
import { connect } from 'react-redux';
import { FormControl, Select, MenuItem} from '@material-ui/core';

class EmployeeFilter extends React.Component {
  render(){
      let content = null;
      if (this.props.user.userName && this.props.user.role === USER_ROLES.MANAGER) {
          content = (
              <form>
                  <FormControl variant="outlined">
                  <Select
                    value={this.state.filter}
                    onChange={this.handleChange}
                    input={<outlinedInput name="filter"/>}>
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
                  <FormControl variant="outlined">
                  <Select
                    value={this.state.filter}
                    onChange={this.handleChange}
                    input={<outlinedInput name="filter"/>}>
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