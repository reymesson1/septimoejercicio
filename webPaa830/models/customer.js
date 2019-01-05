var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    id: String,
    name: String,
    apellido: String,
    direccion: String,
    telefono: {type:String, unique:true},
    rnc: String,
    fechacumpleano: String,
    facebook: String,
    correoelectronico: String,
    descuento: String
})

module.exports = mongoose.model('Customer', userSchema)