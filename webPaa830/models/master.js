var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    id: String,
    idOrder: String,
    date: String,
    time: String,
    name: String,
    project: Number,
    agregado: Number,
    desc: Number,
    itbis: Number,
    grandTotal: Number,
    fechaentrega: String,
    horaentrega: String,
    balance: Number,
    pending: Number,
    current: Number,
    tipopago: String,
    ncf: String,
    status: String,
    telefono: String,
    item: Array,
    comments: Array
})

module.exports = mongoose.model('Master', userSchema)