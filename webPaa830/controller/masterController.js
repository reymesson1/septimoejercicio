var mongoose = require('mongoose');
var Master = require('../models/master.js');
var jwt = require('jwt-simple');

var master = [];

exports.getMaster = async(req,res)=>{

  var master = await Master.find({})
  
  res.send(master);
}

exports.setMaster = async(req,res)=>{
  
  var master = new Master(req.body);
  
  master.save(function(err){
    if(!err){
      console.log('Master saved');
    }
  })
  
  master.push(req.body);
  
  res.send(req.body);
}

exports.removeMaster = async(req,res)=>{
  
  // var index = req.body.id;
  
  // master.splice(index,1);
  
  console.log(req.body);
}
exports.reportMaster = async(req,res)=>{

  var master = await Master.find({"date":"2018-12-23"})

  res.send(master)
}