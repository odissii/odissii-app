const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        //change to process.env....
        user: process.env.my_gmail_username,
        clientId: process.env.my_oauth_client_id,
        clientSecret: process.env.my_oauth_client_secret,
        refreshToken: process.env.my_oauth_refresh_token,
        accessToken: process.env.my_oauth_access_token
    }
});


let mail = {
    from: "odissii <j.petzoldt@gmail.com>",
    to: "user@userdomain.com",
    subject: "Registration successful",
    text: "You successfully registered an account at www.mydomain.com",
    html: "<p>You successfully registered an account at www.mydomain.com</p>"
}

// transporter.sendMail(mail, function(err, info) {
//     if (err) {
//         console.log(err);
//     } else {
//         // see https://nodemailer.com/usage
//         console.log("info.messageId: " + info.messageId);
//         console.log("info.envelope: " + info.envelope);
//         console.log("info.accepted: " + info.accepted);
//         console.log("info.rejected: " + info.rejected);
//         console.log("info.pending: " + info.pending);
//         console.log("info.response: " + info.response);
//     }
//     transporter.close();
// });

module.exports = router;