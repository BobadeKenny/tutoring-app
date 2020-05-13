const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const SubjectSchema = new Schema({
 name: {
 	type: String
 },
 category: {
 	type: String,
 	enum: ['jss', 'primary', 'sss']
 }
});
 
const Subject = mongoose.model('subject', SubjectSchema);
 
module.exports = Subject;