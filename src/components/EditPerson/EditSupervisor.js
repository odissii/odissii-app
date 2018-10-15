import React, {Component} from 'react';
import axios from 'axios'; 
import {FormControl, FormLabel, Input, Button, Checkbox} from '@material-ui/core';
import './editperson.css';
import swal from 'sweetalert'; 
import {connect} from 'react-redux'; 

class EditSupervisor extends Component {
    constructor(props){
        super(props);
        //these will be generated through the component did mount thing 
        this.state = {
            first_name: '',
            last_name: '',
            employee_ID: '',
            email_address: '',
            username: '',
            id: '' 
        }
    }
    //when the component mounts, an axios call will go out to get information about the supervisor whose ID was included in the route parameters
    componentDidMount =() => {
        const { match: { params } } = this.props;
        axios.get(`/api/staff/supervisor/profile?id=${params.personId}`)
          .then((response)=> {
            this.setState({ 
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                employee_ID: response.data[0].employeeId,
                email_address: response.data[0].email_address,
                username: response.data[0].username,
                id: response.data[0].id,
            });
          }).catch((error)=> {
              console.log('Error getting supervisor', error); 
          });
      }; 
      deletePerson = () => {
        console.log('deleting person');
        swal({
            title: `Are you sure you want to delete ${this.state.first_name} ${this.state.last_name}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/api/staff/supervisor?id=${this.state.id}`)
                .then((response) => {
                    swal(`${this.state.first_name} ${this.state.last_name} removed`);
                    this.props.history.push('/dashboard');
                }).catch((error) =>{
                    console.log('Error deleting person', error);
                })
            }
          });   
        }
        editPerson = () => {
            axios({
                method: 'PUT',
                url: '/api/staff/supervisor',
                data: this.state
            }).then((response) => {
                if(this.state.remove === true){
                    this.deletePerson();
                } else {
                    swal('Success!', `${this.state.first_name} ${this.state.last_name} edited`, 'success');
                    this.props.history.push('/dashboard'); 
                }
            }).catch((error) => {
                swal('Warning', `Something went wrong editing ${this.state.first_name} ${this.state.last_name}. Please try again in a few minutes`);
                console.log('Cannot update supervisor', error);
            })
            // this.props.dispatch({type: 'UPDATE_SUPERVISOR', payload: this.state});
          }
        handleChangefor = (event, property) => {
            this.setState({
              [property]: event.target.value
            })
        }
    render(){
        return(
            <div className="edit-person-form">
            <h1>Edit Supervisor</h1>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={this.state.first_name} onChange={(event)=>this.handleChangefor(event, 'first_name')}/>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={this.state.last_name} onChange={(event)=>this.handleChangefor(event, 'last_name')}/>
                    <FormLabel>Employee ID</FormLabel>
                    <Input type="text" value={this.state.employee_ID} onChange={(event)=>this.handleChangefor(event, 'employee_ID')}/>
                    <FormLabel>Email Address</FormLabel>
                    <Input type="text" value={this.state.email_address} onChange={(event)=>this.handleChangefor(event,'email_address')}/>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" value={this.state.username} onChange={(event)=>this.handleChangefor(event, 'username')}/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={this.editPerson}>Save</Button>
                    <Button onClick={()=>this.props.history.push('/dashboard')}>Cancel</Button>
                </FormControl>
            </div>
        );
    }
}
export default connect()(EditSupervisor); 