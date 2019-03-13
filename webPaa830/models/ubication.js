var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); 

var userSchema = new mongoose.Schema({ 

    id: String, 
    longitute : String,
    latitute : String
}) 

module.exports = mongoose.model('Ubication', userSchema)
