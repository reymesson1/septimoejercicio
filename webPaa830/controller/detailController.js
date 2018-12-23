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
