const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subjects: {
    primary: ["math", "english", "science"],
    jss: ["math", "english", "social studies"],
    sss: ["math", "biology", "chemistry"]
  },
  mySubjects: {
    type: Array
  },
  token: {
    type: String
  },

   
  
},
 {timestamps: true });


module.exports = mongoose.model("User", userSchema);