var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
id: String,
date: String,
name: String,
item: String,
environment: String,
category: String,
tipo: String
})

module.exports = mongoose.model('Detail', userSchema)