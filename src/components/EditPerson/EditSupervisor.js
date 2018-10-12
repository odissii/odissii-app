import React, {Component} from 'react';
import axios from 'axios'; 
import {FormControl, FormLabel, Input, Button} from '@material-ui/core';

class EditPerson extends Component {
    constructor(props){
        super(props);
        //these will be generated through the component did mount thing 
        this.state = {
            first_name: '',
            last_name: '',
            employee_ID: '',
            email_address: '',
            username: '', 
        }
    }
    componentDidMount =() => {
        const { match: { params } } = this.props;
        axios.get(`/api/staff/supervisor/profile?id=${params.personId}`)
          .then((response)=> {
            this.setState({ 
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                employee_ID: response.data[0].employeeId,
                email_address: response.data[0].email_address,
                username: response.data[0].username
            });
                
            //then go through and set each value of the response to state 
          }).catch((error)=> {
              console.log('Error getting supervisor', error); 
          });
      }; 
      handleChangefor = (event, property) => {
          this.setState({
            [property]: event.target.value
          })
      }
      editPerson = () => {
        console.log('editing person');
      }
      deletePerson = () => {
        console.log('deleting person');
      }
    render(){
        return(
            <div>
            <h1>Edit Person</h1>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={this.state.first_name} onChange={(event)=>this.handleChangefor('first_name', event)}/>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={this.state.last_name} onChange={(event)=>this.handleChangefor('last_name', event)}/>
                    <FormLabel>Employee ID</FormLabel>
                    <Input type="text" value={this.state.employee_ID} onChange={(event)=>this.handleChangefor('employee_ID', event)}/>
                    <FormLabel>Email Address</FormLabel>
                    <Input type="text" value={this.state.email_address} onChange={(event)=>this.handleChangefor('email_address', event)}/>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" value={this.state.username} onChange={(event)=>this.handleChangefor('username', event)}/>
                    <Button variant="contained">Save</Button>
                    <Button>Delete {this.state.first_name} {this.state.last_name}</Button>
                </FormControl>
            </div>
        );
    }
}
export default EditPerson; 