var mongoose = require('mongoose');
var Master = require('../models/master.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

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

  var master = await Master.find({"date":today})

  res.send(master)
}
exports.MasterAPI = async(req,res)=>{
  
  var master = await Master.find({"date":today})
  
  res.send(master)
}
exports.updateDeliveryMaster = async(req,res)=>{
  
  var obj = req.body;
  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.fechaentrega = obj.fechaentrega + " "
    master.save(function(err,m){
      console.log("Master updated");
    })
  })
  
}
exports.paymentMaster = async(req,res)=>{
  var newPago = req.body

  var master = await Master.findOne({"id":newPago.id},function(err,master){
    master.balance = newPago.balance
    master.current = newPago.current
    master.pending = newPago.pending
    master.tipopago = newPago.tipopago
    master.status = "Pagado"
    master.save(function(err,m){
      console.log("Master Payment");
    })
  })
    
  res.send('end')
}
exports.mainMaster = async(req,res)=>{

  var id = req.body.id;

   var master = await Master.findOne({"id":id},function(err,master){
    master.status = "waiting"
    master.save(function(err,m){
      console.log("Main Master");
    })
  })

  res.send('exchanged');

}
exports.masterLoader = async(req,res)=>{

  var id = req.body.id;

   var master = await Master.findOne({"id":id})

  res.send(master);

}