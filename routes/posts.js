const express = require("express");

const router = express.Router();
var Mailgun = require('mailgun-js');

const Post = require('../models/Post');
require('dotenv/config');

//Your api key, from Mailgun’s Control Panel
const api_key = process.env.API_KEY;

//Your domain, from the Mailgun Control Panel
const domain = '';

//Your sending email address
var from_who = 'jide';
router.get("/", (req, res) => {
    res.send("we are on posts bitches");
});

router.post('/:mail', (req, res) => {
   //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
   console.log(req.params.mail)
var mailgun = new Mailgun({apiKey: api_key, domain: domain});
var data = {
//Specify email data
  from: from_who,
//The email to contact
  to: req.params.mail,
//Subject and text data  
  subject: 'Hello from Mailgun',
  html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
}
//Invokes the method to send emails given the above data with the helper library
mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
        res.json ({ message : err});
        console.log("got an error: ", err);
    }
    //Else we can greet    and leave
    else {
        //Here "submitted.jade" is the view file for this landing page 
        //We pass the variable "email" from the url parameter in an object rendered by Jade
        res.json({ message : "success"});
        console.log(body);
    }
});
   

})

module.exports = router