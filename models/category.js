const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const CategorySchema = new Schema({
 name: {
 	type: String,
 	enum: ['jss', 'primary', 'sss']
 },
 subects: {
 	type: Array
 	
 }
});
 
const Category = mongoose.model('category', CategorySchema);
 
module.exports = Category;