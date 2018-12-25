var mongoose = require('mongoose');
var Customer = require('../models/customer.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getCustomer = async(req,res)=>{
    
    var customer = await Customer.find({})
    
    res.send(customer);
}

exports.getCustomerList = async(req,res)=>{

    var list = [];
    var customer = await Customer.find({})
    
    
    for(var x=0;x<customer.length;x++){
        
        list.push(customer[x].telefono.trim().replace(/-(?=\d)|\s/g,''));
    
    }

    res.send(list);
}

exports.setCustomer = async(req,res)=>{
    
    var newCustomer = new Customer(req.body)
    newCustomer.save(function(err){
        if(!err){
            console.log('New Customer')
        }
    })
    
    res.send(req.body);
}

exports.setCustomerUpdate = async(req,res)=>{

    var obj = req.body;

    var customer = await Customer.findOne({"id":obj.id},function(err,customer){
        customer.telefono = obj.telefono
        customer.save(function(err,c){
            console.log("Customer updated");
        })        
    });

    console.log(obj.telefono);

    res.send('end');
}