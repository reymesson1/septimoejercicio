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
exports.removeCustomer = async(req,res)=>{

    var obj = req.body;

    var customer = await Customer.remove({"id":obj.id},function(err,customer){
        if(!err){
            console.log("Customer removed");
        }
    })
    
    res.send('end');

}
exports.getCustomerCSV = async(req,res)=>{

    var customer = await Customer.find({})
    
    var arr = [];
    
    var second = [];
    
    for(var x=0;x<customer.length;x++){
    
    second = []
    
    second.push("'"+customer[x].id)
    second.push(customer[x].name)
    second.push(customer[x].apellido)
    second.push(customer[x].direccion)
    second.push(customer[x].telefono)
    second.push(customer[x].rnc)
    second.push(customer[x].fechacumpleano)
    second.push(customer[x].facebook)
    second.push(customer[x].correoelectronico)
    second.push(customer[x].descuento)
    
    arr.push(second)
    }
    
    res.send(arr);
}