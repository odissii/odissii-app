// store a token  (varchar 30) in addition to password, username, etc. in the database
// also add expiration (datetime)
// token should expire after 48 hours or when used
// need a user's email in order for this to work 

// on forgot password page
// if email doesn't match anything in database, do nothing
// or else people can mine the database for valid email addresses and spam 
// return a 200 

// when email is submitted: 
// PUT /user/reset/pw
// step 1: create a random string (token) using chance (library for generating random strings). no special characters 
// step 2: save the token for the user who is resetting the password (in the database) and update the expiration date for the token
// step 3: send an email with link to localhost:3000/#/reset/TOKEN (as a variable)
// WHEN YOU CREATE THE TOKEN COLUMN, SET EXPIRATION TO DATETIME NOW() so that it's always expired unless there is a reset request (48 hours)
// step 4: clicking the link takes you to the change password page 
// step 5: user is prompted to enter new password and confirm it and maybe email for security purposes then hit submit
// step 6: PUT route to update the password PUT /user/newpassword
// step 7: check token, email, and expiration 
// step 8: if it looks good, salt and hash the password, update the database to new password and expire the token 

// 2 client side views
// 2 routes
// nodemailer integration