var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var validateUser = require('./validate-user');
//
var DBInstance = require('./fake-db');

// Server setup:
var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));

// Render the Create Account page:
app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/create-account.html'));
});

// Handle form submissions from the Create Account page:
app.post('/create-account', function (req, res) {


var errors =null;
// check if the email is in the databse and save
   if(DBInstance.get(req.body.email)){
//if it is in the databse it will push to  errors
     errors.push('The email already exists!');
   }
   else{
     DBInstance.insert(req.body);
   }


  errors = validateUser(req.body);

  if (errors) {
    res.status(400).send({
      success: false,
      errors: errors
    });
  } else {
    res.status(200).send({ success: true });
  }
});

// Run the server:
app.listen(3000, function () {
  console.log('Server is running! Visit localhost:3000 in your browser.');
});
