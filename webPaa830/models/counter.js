var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({    
    counter: Number
})

module.exports = mongoose.model('Counter', userSchema)