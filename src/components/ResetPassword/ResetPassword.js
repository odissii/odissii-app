import React, {Component} from 'react'; 
import {Input, Button, Typography} from '@material-ui/core'; 
import axios from 'axios';
import './resetpassword.css'; 
import swal from 'sweetalert'; 
import moment from 'moment';

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
        let today = Date.now();
        today = moment(today).format();
        axios({
            method: 'PUT',
            url: '/api/user/createtoken',
            data: {email: this.state.email, today: today}
        }).then((response) => {
            swal('Please check your e-mail! (including your spam folder)');
            //send an email with nodemailer that includes the token 
            this.props.history.push('/home'); 
        }).catch((error) => {
            console.log(error);
            swal('Something went wrong');
        });
    }
    render(){
        return(
        <div>
            <Typography variant="headline">Reset Password</Typography>
            <div className="reset-form">
            <Typography>Enter the email address associated with this account.</Typography>
                <Input onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
        </div>
        );
    }
}
export default ResetPassword; 