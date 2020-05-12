const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const UserSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 name: {
 	type: String,
 	required: true
 },
 role: {
  type: String,
  enum: ["student", "tutor"],
  required: true
 },
 subjects: {
 	type: Array
 }, 
 lessons: {
 	type: Array
 },
 accessToken: {
  type: String
 }, 
 admin:{
 	type: Boolean,
 	default: false
 }
});
 
const User = mongoose.model('user', UserSchema);
 
module.exports = User;