import React, {Component} from 'react';
import axios from 'axios'; 
import {FormControl, FormLabel, Input, Button} from '@material-ui/core';
import swal from 'sweetalert'; 
import './editperson.css';
import {connect} from 'react-redux';

class EditEmployee extends Component {
    constructor(props){
        super(props);
        //these will be generated through the component did mount thing 
        this.state = {
            first_name: '',
            last_name: '',
            employee_ID: '',
            image_path: '',
            id: ''
        }
    }
    componentDidMount =() => {
        const { match: { params } } = this.props;
        axios.get(`/api/staff/employee/profile?id=${params.personId}`)
          .then((response)=> {
            this.setState({ 
                first_name: response.data[0].first_name,
                last_name: response.data[0].last_name,
                employee_ID: response.data[0].employeeId,
                image_path: response.data[0].image_path,
                id: response.data[0].id
            });
            //then go through and set each value of the response to state 
          }).catch((error)=> {
              console.log('Error getting employee', error); 
          });
      }; 
      handleChangefor = (property, event) => {
          this.setState({
            [property]: event.target.value
          })
      }
      editPerson = () => {
        console.log('editing person');
        this.props.dispatch({type: 'UPDATE_EMPLOYEE', payload: this.state});
      }
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
                this.props.dispatch({type: 'DELETE_EMPLOYEE', payload: this.state});
            }
          });   
        }
    render(){
        return(
            <div className="edit-person-form">
            <h1>Edit Employee</h1>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={this.state.first_name} onChange={(event)=>this.handleChangefor('first_name', event)}/>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={this.state.last_name} onChange={(event)=>this.handleChangefor('last_name', event)}/>
                    <FormLabel>Employee ID</FormLabel>
                    <Input type="text" value={this.state.employee_ID} onChange={(event)=>this.handleChangefor('employee_ID', event)}/>
                    <FormLabel>Image</FormLabel>
                    <Input type="text" value={this.state.image_path} onChange={(event)=>this.handleChangefor('image_path', event)}/>
                    {/* <FormLabel>Supervisor ID</FormLabel>
                    <Input type="text" value={this.state.supervisor_id} onChange={(event)=>this.handleChangefor('supervisor_id', event)}/> */}
                    <Button onClick={this.editPerson} variant="contained">Save</Button>
                    {/* <Button onClick={this.deletePerson}>Delete {this.state.first_name} {this.state.last_name}</Button> */}
                </FormControl>
            </div>
        );
    }
}
export default connect()(EditEmployee); 