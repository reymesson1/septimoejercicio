var mongoose = require('mongoose');
var User = require('../models/user.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');
var bcrypt = require('bcrypt-nodejs');

exports.setRegister = async(req,res)=>{
    
    var userData = req.body;

    var user = new User({
        "username":userData.username
    })
    bcrypt.hash(userData.password, null, null, (err, hash)=>{                   
        user.password = hash;          
    })
    user.save(function(err){
        if(!err){
            console.log('User saved');
        }
    })
}

exports.setLogin = async(req,res)=>{
    
    var userData = req.body;
    var user = await User.findOne({username: userData.username});
    
    if(!user){
        return res.status(401).send({message: 'Email or Password Invalid'})
    }
    
    bcrypt.compare(userData.password, user.password, (err, isMatch) =>{
        if(!isMatch){
            return res.status(401).send({message: 'Email or Password Invalid'})
        }
        
        var payload = { sub: user._id }
        
        var token = jwt.encode(payload, '123')
        
        res.status(200).send({token})
    })
}
exports.setResetPassword = async(req,res)=>{
    
    
    var userObj = req.body    
    var decode = jwt.decode(req.body.token,'123')
    userObj.author = decode.sub
    
    const ObjectId = mongoose.Types.ObjectId;        
    
    var user = await User.findOne({"_id":ObjectId(userObj.author)},function(err,users){
        if(!err){
            bcrypt.hash(userObj.newpassword, null, null, (err, hash)=>{                   
                users.password = hash;          
            })
            users.save(function(err,user){
                console.log('User saved: ', user);
            })
        }
    })
    
    res.send({"message":"Successfully reset!"})
}

exports.getLogout = async(req,res)=>{
    
    cookies = false;
    res.redirect('/');
}
