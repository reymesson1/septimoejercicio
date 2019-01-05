var mongoose = require('mongoose');
var Detail = require('../models/detail.js');
var jwt = require('jwt-simple');

exports.getDetail = async(req,res)=>{

    var detail = await Detail.find({})

    res.send(detail)

}
exports.getDetailCSV = async(req,res)=>{

    var detail = await Detail.find({})
    
    var arr = [];
    
    var second = [];
    
    for(var x=0;x<detail.length;x++){
    
    second = []
    
    second.push("'"+detail[x].id)
    second.push(detail[x].date)
    second.push(detail[x].name)
    second.push(detail[x].item)
    second.push(detail[x].environment)
    second.push(detail[x].category)
    second.push(detail[x].tipo)
    
    arr.push(second)
    }
    
    res.send(arr);
}
exports.setDetail = async(req,res)=>{
    
    var detail = new Detail(req.body)
    
    detail.save(function(err){
        if(!err){
            console.log('Detail Saved');
        }
    })
    
    res.send(req.body)
}

exports.removeDetail = async(req,res)=>{
    
    var detail = await Detail.remove({"id":req.body.id},function(err){
        if(!err){
            console.log('Detail removed');
        }
    });
}

exports.updateDetail = async(req,res)=>{

    var detail = await Detail.findOne({"id":req.body.id},function(err,detail){
        if(!err){
            detail.environment = req.body.environment;
            detail.save(function(err,d){
                console.log('Detail updated');
            })
        }
    })

}