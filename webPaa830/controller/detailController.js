var mongoose = require('mongoose');
var Detail = require('../models/detail.js');
var jwt = require('jwt-simple');

exports.getDetail = async(req,res)=>{

    var detail = await Detail.find({})

    res.send(detail)

}