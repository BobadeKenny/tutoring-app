var mongoose = require("mongoose")
var express = require("express")
var app = express()
/*const authRoutes = require("./routes/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(authRoutes); */

let port = process.env.PORT
if (port == null || port == ""){
  port = 3000
}

let url = "mongodb+srv://KennyB:<password>@cluster0-iryjr.gcp.mongodb.net/test?retryWrites=true&w=majority"

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
