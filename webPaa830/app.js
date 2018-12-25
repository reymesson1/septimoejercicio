var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'))

var dba = require('./lib/dba-helper.js')();

var moment = require('moment');

app.use(bodyParser.json());

var cookies = true;

var today = moment(new Date()).format('YYYY-MM-DD');

var User = require('./models/user.js');

var Customer = require('./models/customer.js');

var Detail = require('./models/detail.js');

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('jwt-simple');

var detailController = require('./controller/detailController');

var masterController = require('./controller/masterController');

var customerController = require('./controller/customerController');

app.get('/cookies', function(req,res){

    res.send(cookies);
});

app.post('/cookies', function(req,res){

    var newCookie = req.body;

    if(newCookie.username=='admin'){
        console.log(req.body);
        cookies=true;
    }
});



app.get('/list', customerController.getCustomerList)

app.get('/customer', customerController.getCustomer);

app.post('/customer', customerController.setCustomer)

var master = [];

app.get('/masterAPI', masterController.MasterAPI)

app.get('/master', masterController.getMaster)

app.post('/master', masterController.setMaster);

app.post('/deletemaster', masterController.removeMaster);

app.get('/reporte', masterController.reportMaster)

app.post('/updatedelivery', masterController.updateDeliveryMaster)

app.get('/main', function(req,res){


    var filteredTable = master.filter(
            (pending) => pending.status.indexOf('waiting') !== -1
    )

    res.send(filteredTable);
})

app.post('/main', function(req,res){

    var id = req.body.id;

    var index = master.findIndex(x=> x.id==id);

    master[index].status='waiting'

    res.send('exchanged');
})

app.post('/done', function(req,res){

    var id = req.body.id;

    var index = master.findIndex(x=> x.id==id);

    master[index].status='done'

    res.send('exchanged');
})

app.get('/detail', detailController.getDetail)
app.post('/detail', detailController.setDetail)
app.post('/deletedetail', detailController.removeDetail);
app.post('/updatedetail', detailController.updateDetail);

app.post('/updatecustomer', customerController.setCustomerUpdate)

 
app.post('/loader',function(req,res){
    
    // dba.getTracking(req.body, function(data){
    //     res.send(data);

    // });

    res.send(master);

});

app.post('/payment', masterController.paymentMaster)

app.post('/deletecustomer', function(req,res){

    var obj = req.body;

    customer.splice(obj.index,1);
    
    res.send('end');
});

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});


app.post('/register', async (req, res)=>{
    
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
  
})
  
app.post('/login', async (req, res)=>{
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

})

app.post('/resetpassword', async (req, res)=>{  
    
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
})


mongoose.connect('mongodb://localhost:27017/eltendedero',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})


app.listen(8082);