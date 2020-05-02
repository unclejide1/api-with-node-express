const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json())

const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

// app.use('/', () => {
//     console.log("this is a middleware running")
// })

//ROUTES
app.get("/", (req, res) => {
  res.send("we are on home now");
});



// mongoose.connect(
//   process.env.DB_CONNECTION,
//   { useNewUrlParser: true, useUnifiedTopology: true  },
//   () => {
//     console.log("connected to db");
//   },
  
// );

app.listen(3001);
