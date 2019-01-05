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

  var master = await Master.remove({"id":req.body.id},function(err,master){
  if(!err){
    console.log("Master removed ");
  }
  })
  
  res.send('removed');
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
exports.maingetMaster = async(req,res)=>{

    var filteredTable = master.filter(
      (pending) => pending.status.indexOf('waiting') !== -1
  )

  res.send(filteredTable);
}
exports.mainsetMaster = async(req,res)=>{
  
  var id = req.body.id;
  
  var master = await Master.findOne({"id":id},function(err,master){
    if(master.status =="pending"){
      master.status = "waiting"
    }else{
      master.status = "done"
    }
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

exports.masterQuotation = async(req,res)=>{

  var id = req.body.id;
  
  var master = await Master.find({"id":id})
  
  res.send(master);
}

exports.getMasterCSV = async(req,res)=>{

  var master = await Master.find({})
  
  var arr = [];
  
  var second = [];
  
  for(var x=0;x<master.length;x++){
  
  second = []
  
  second.push("'"+master[x].id)
  second.push(master[x].date)
  second.push(master[x].name)
  second.push(master[x].project)
  second.push(master[x].agregado)
  second.push(master[x].desc)
  second.push(master[x].itbis)
  second.push(master[x].grandTotal)
  second.push(master[x].fechaentrega)
  second.push(master[x].horaentrega)
  second.push(master[x].balance)
  second.push(master[x].pending)
  second.push(master[x].current)
  second.push(master[x].tipopago)
  second.push(master[x].ncf)
  second.push(master[x].status)
  second.push(master[x].item)
  second.push(master[x].comments)
  
  arr.push(second)
  }
  
  res.send(arr);
}
exports.getMasterItemReport = async(req,res)=>{

  var master = await Master.aggregate([{"$match":{"date":{"$gte":today}}},{"$unwind":"$item"},{"$group":{"_id":"$item.development","total":{"$sum":1}}}])

  res.send(master);
}
exports.getDashboardMaster = async(req,res)=>{
  
  var master = await Master.aggregate([{"$match":{"status":"Pagado"}},{"$group":{"_id":"$status","total":{"$sum":"$grandTotal"}}}])
  
  res.send(master);
}
      
exports.setMasterComment = async(req,res)=>{

  var obj = req.body;

  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.comments.push(obj.comment)
    master.save(function(err,m){
      console.log("Master updated");
    })
  })
  
}
exports.setMasterQuotation = async(req,res)=>{

  var obj = req.body;
  
  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.status = "quoted"
    master.save(function(err,m){
      console.log("Master updated");
    })
  })
  
}