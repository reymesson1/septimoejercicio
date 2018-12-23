var mongoose = require('mongoose');
var Detail = require('../models/detail.js');
var jwt = require('jwt-simple');

exports.getDetail = async(req,res)=>{

    var detail = await Detail.find({})

    res.send(detail)

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