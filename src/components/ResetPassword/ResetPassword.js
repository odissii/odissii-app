import React, {Component} from 'react'; 
import {Input, Button, Typography} from '@material-ui/core'; 
import axios from 'axios';
import './resetpassword.css'; 

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        // User will input e-mail
        this.state = { email: '' };
    }
    handleChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleSubmit = () => {
        const today = new Date.now(); 
        axios({
            method: 'PUT',
            url: '/api/user/resetpassword',
            data: {email: this.state.email, today: today}
        }).then((response) => {
            alert('Please check your e-mail! (including your spam folder)');
            this.props.history.push('/home'); 
        }).catch((error) => {
            console.log(error);
            alert('Something went wrong');
        });
    }
    render(){
        return(
            <div className="reset-form">
            <Typography variant="headline">Reset Password</Typography>
            <Typography>Enter the email address associated with this account.</Typography>
                <Input onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        );
    }
}
export default ResetPassword; 