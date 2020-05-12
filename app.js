var mongoose = require("mongoose")
var express = require("express")
const path = require('path')
const User = require('./models/user')
const routes = require('./routes/auth.js');
 
require("dotenv").config();
var app = express()
const authRoutes = require("./routes/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(authRoutes); 

let port = process.env.PORT
if (port == null || port == ""){
  port = 3000
}

let url = process.env.MyDb

mongoose
  .connect(
  url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(port);
  })
  .catch(err => console.log(err));

/*let url = "mongodb://localhost:27017/myapp"

mongoose
  .connect(
  url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(port);
  })
  .catch(err => console.log(err));*/
