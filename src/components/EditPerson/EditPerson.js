import React, {Component} from 'react';
import axios from 'axios'; 

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
            supervisor: []
        }
    }
    componentDidMount =() => {
        const { match: { params } } = this.props;
        axios.get(`/api/staff/profile?id=${params.personId}`)
          .then((response)=> {
            this.setState({ 
                supervisor: response.data 
            });
            //then go through and set each value of the response to state 
          }).catch((error)=> {
              console.log('Error getting supervisor', error); 
          });
      }; 
    render(){
        return(
            <div>
            <h1>Edit Person</h1>
                <form>
                    <label>First Name</label>
                    <input type="text" value={this.state.first_name} onChange={(event)=>this.handleChangefor('first_name', event)}/>
                    <label>Last Name</label>
                    <input type="text" value={this.state.lasst_name} onChange={(event)=>this.handleChangefor('last_name', event)}/>
                    <label>Employee ID</label>
                    <input type="text" value={this.state.employee_ID} onChange={(event)=>this.handleChangefor('employee_ID', event)}/>
                    <label>Email Address</label>
                    <input type="text" value={this.state.email_address} onChange={(event)=>this.handleChangefor('email_address', event)}/>
                    <label>Username</label>
                    <input type="text" value={this.state.username} onChange={(event)=>this.handleChangefor('username', event)}/>
                </form>
            </div>
        );
    }
}
export default EditPerson; 