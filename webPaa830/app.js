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



app.get('/list',async(req,res)=>{

    var list = [];
    var customer = await Customer.find({})
    
    
    for(var x=0;x<customer.length;x++){
        
        list.push(customer[x].telefono.trim().replace(/-(?=\d)|\s/g,''));
    
    }

    res.send(list);
})

app.get('/customer', async(req,res)=>{

    var customer = await Customer.find({})
    
    res.send(customer);
    
});

app.post('/customer',function(req,res){
    
    var newCustomer = new Customer(req.body)
    newCustomer.save(function(err){
        if(!err){
            console.log('New Customer')
        }
    })
    res.send(req.body);
})

var master = [];

app.get('/masterAPI', function(req,res){


    // dba.getMaster({}, function(data){

    //     res.send(data);

    // });

    res.send(master)

})

app.get('/master', function(req,res){

    // dba.getMaster({}, function(data){

    //     res.send(data);

    // });

    res.send(master);

})

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

app.post('/master', function(req,res){

    //dba.addMaster(req.body);
    //console.log(req.body);
    master.push(req.body);
});


app.post('/deletemaster', function(req,res){

    var index = req.body.id;

    master.splice(index,1);
});


app.get('/reporte', function(req,res){

    // dba.getMaster({}, function(data){

    //     res.send(data);

    // });

    res.send(master);

})

app.get('/detail', detailController.getDetail)
app.post('/detail', detailController.setDetail)
app.post('/deletedetail', detailController.removeDetail);


app.post('/updatecustomer',function(req,res){
    var obj = req.body;

    customer[obj.index].telefono=obj.telefono;
    customer[obj.index].date=today;
    res.send('end');
})


app.post('/updatedetail',function(req,res){
    var obj = req.body;    
    detail[obj.index].environment=obj.environment;
    detail[obj.index].date=today;
})

app.post('/updatedelivery',function(req,res){
    var obj = req.body;
    console.log(obj)
    master[obj.index].fechaentrega=obj.fechaentrega;
})
 
app.post('/loader',function(req,res){
    
    // dba.getTracking(req.body, function(data){
    //     res.send(data);

    // });

    res.send(master);

});

app.post('/payment',function(req,res){
    
    var newPago = req.body
    
    var index = master.findIndex(x=> x.id==newPago.id);
    
    master[index].balance = newPago.balance;
    master[index].current = newPago.current;
    master[index].pending = newPago.pending;
    master[index].tipopago = newPago.tipopago;
    master[index].status = "Pagado";
    
    res.send('end')
})

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