var mongoose = require('mongoose');
var Master = require('../models/master.js');
var jwt = require('jwt-simple');

exports.getMaster = async(req,res)=>{

  var master = await Master.find({})
  
  res.send(master);
}