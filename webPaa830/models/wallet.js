var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); 

var userSchema = new mongoose.Schema({ 

	id: String, 
	date: String, 
	name: String, 
	amount : Number, 
	account: String, 
	longitute: String,
	latitute: String
}) 

module.exports = mongoose.model('Wallet', userSchema)
