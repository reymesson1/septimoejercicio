var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getUser = async(req,res)=>{
    
    var user = await User.find({})
    
    res.send(user);
}

exports.setUser = async(req,res)=>{
    
    var newCustomer = new Customer(req.body)
    newCustomer.save(function(err){
        if(!err){
            console.log('New Customer')
        }
    })
    
    res.send(req.body);
}