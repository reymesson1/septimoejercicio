var mongoose = require('mongoose'); 
var bcrypt = require('bcrypt-nodejs'); 
var userSchema = new mongoose.Schema({ 
	nombre: String, 
	telefono: String
 })

module.exports = mongoose.model('Agenda', userSchema)
