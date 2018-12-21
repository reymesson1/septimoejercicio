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

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('jwt-simple');

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

var detail = [{"id":"AJUSTAR O AMPLIAR SIN FORRO - VESTIDO CORTO","date":"2018-02-08","name":"AJUSTAR O AMPLIAR SIN FORRO - VESTIDO CORTO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR CON FORRO - VESTIDO CORTO","date":"2018-02-08","name":"AJUSTAR O AMPLIAR CON FORRO - VESTIDO CORTO","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR AREA CINTURA - VESTIDO CORTO","date":"2018-02-08","name":"AJUSTAR AREA CINTURA - VESTIDO CORTO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIAR ZIPPER","date":"2018-02-08","name":"CAMBIAR ZIPPER","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIAR ZIPPER - VESTIDO CORTO","date":"2018-02-08","name":"CAMBIAR ZIPPER - VESTIDO CORTO","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO CON FORRO - VESTIDO CORTO","date":"2018-02-08","name":"COGER RUEDO CON FORRO - VESTIDO CORTO","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO SIN FORRO - VESTIDO CORTO","date":"2018-02-08","name":"COGER RUEDO SIN FORRO - VESTIDO CORTO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"COGER HOMBROS - VESTIDO CORTO","date":"2018-02-08","name":"COGER HOMBROS - VESTIDO CORTO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"COGER TIROS - VESTIDO CORTO","date":"2018-02-08","name":"COGER TIROS - VESTIDO CORTO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"ESTRECHAR MANGAS - VESTIDO CORTO","date":"2018-02-08","name":"ESTRECHAR MANGAS - VESTIDO CORTO","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"HACER FORRO - VESTIDO CORTO","date":"2018-02-08","name":"HACER FORRO - VESTIDO CORTO","item":"1","environment":"700","category":"propiedades","tipo":"alteracion"},
{"id":"SUBIR PRETINA - VESTIDO CORTO","date":"2018-02-08","name":"SUBIR PRETINA - VESTIDO CORTO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"PEGA BOTONES - VESTIDO CORTO","date":"2018-02-08","name":"PEGA BOTONES - VESTIDO CORTO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"VESTIDOS PIEDRAS CON ADICIONAL - VESTIDO CORTO","date":"2018-02-08","name":"VESTIDOS PIEDRAS CON ADICIONAL - VESTIDO CORTO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"VESTIDO CORTO","date":"2018-02-08","name":"VESTIDO CORTO","item":"1","environment":"0","category":"servicio","tipo":"lavaryprensa"},
{"id":"VESTIDO CORTO","date":"2018-02-08","name":"VESTIDO CORTO","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR SIN FORRO - VESTIDO LARGO","date":"2018-02-08","name":"AJUSTAR O AMPLIAR SIN FORRO - VESTIDO LARGO","item":"1","environment":"600","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR CON FORRO - VESTIDO LARGO","date":"2018-02-08","name":"AJUSTAR O AMPLIAR CON FORRO - VESTIDO LARGO","item":"1","environment":"900","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR AREA CINTURA - VESTIDO LARGO","date":"2018-02-08","name":"AJUSTAR AREA CINTURA - VESTIDO LARGO","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIAR ZIPPER - VESTIDO LARGO","date":"2018-02-08","name":"CAMBIAR ZIPPER - VESTIDO LARGO","item":"1","environment":"500","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEGO CON FORRO - VESTIDO LARGO","date":"2018-02-08","name":"COGER RUEGO CON FORRO - VESTIDO LARGO","item":"1","environment":"1000","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEGO SIN FORRO - VESTIDO LARGO","date":"2018-02-08","name":"COGER RUEGO SIN FORRO - VESTIDO LARGO","item":"1","environment":"1000","category":"propiedades","tipo":"alteracion"},
{"id":"COGER DE HOMBROS - VESTIDO LARGO","date":"2018-02-08","name":"COGER DE HOMBROS - VESTIDO LARGO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"COGER TIROS - VESTIDO LARGO","date":"2018-02-08","name":"COGER TIROS - VESTIDO LARGO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"ESTRECHAR MANGAS - VESTIDO LARGO","date":"2018-02-08","name":"ESTRECHAR MANGAS - VESTIDO LARGO","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"HACER FORROS - VESTIDO LARGO","date":"2018-02-08","name":"HACER FORROS - VESTIDO LARGO","item":"1","environment":"1200","category":"propiedades","tipo":"alteracion"},
{"id":"SUBIR PRESTINA - VESTIDO LARGO","date":"2018-02-08","name":"SUBIR PRESTINA - VESTIDO LARGO","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"PEGAR BOTONES - VESTIDO LARGO","date":"2018-02-08","name":"PEGAR BOTONES - VESTIDO LARGO","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"RUEDOS DE BOLITAS - VESTIDO LARGO","date":"2018-02-08","name":"RUEDOS DE BOLITAS - VESTIDO LARGO","item":"1","environment":"1300","category":"propiedades","tipo":"alteracion"},
{"id":"FALDA CORTA","date":"2018-02-08","name":"FALDA CORTA","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR SIN FORRO - FALDA CORTA","date":"2018-02-08","name":"AJUSTAR O AMPLIAR SIN FORRO - FALDA CORTA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR CON FORRO - FALDA CORTA","date":"2018-02-08","name":"AJUSTAR O AMPLIAR CON FORRO - FALDA CORTA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR AREA CINTURA - FALDA CORTA","date":"2018-02-08","name":"AJUSTAR AREA CINTURA - FALDA CORTA","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIAR ZIPPER - FALDA CORTA","date":"2018-02-08","name":"CAMBIAR ZIPPER - FALDA CORTA","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO CON FORRO - FALDA CORTA","date":"2018-02-08","name":"COGER RUEDO CON FORRO - FALDA CORTA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO SIN FORRO - FALDA CORTA","date":"2018-02-08","name":"COGER RUEDO SIN FORRO - FALDA CORTA","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"HACER FORROS - FALDA CORTA","date":"2018-02-08","name":"HACER FORROS - FALDA CORTA","item":"1","environment":"500","category":"propiedades","tipo":"alteracion"},
{"id":"SUBIR PRETINA - FALDA CORTA","date":"2018-02-08","name":"SUBIR PRETINA - FALDA CORTA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"PEGAR BOTONES - FALDA CORTA","date":"2018-02-08","name":"PEGAR BOTONES - FALDA CORTA","item":"1","environment":"200","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR SIN FORRO - FALDA LARGA","date":"2018-02-08","name":"AJUSTAR O AMPLIAR SIN FORRO - FALDA LARGA","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR CON FORRO - FALDA LARGA","date":"2018-02-08","name":"AJUSTAR O AMPLIAR CON FORRO - FALDA LARGA","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR AREA CINTURA - FALDA LARGA","date":"2018-02-08","name":"AJUSTAR AREA CINTURA - FALDA LARGA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR AREA CINTURA - FALDA LARGA","date":"2018-02-08","name":"AJUSTAR AREA CINTURA - FALDA LARGA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIAR ZIPPER - FALDA LARGA","date":"2018-02-08","name":"CAMBIAR ZIPPER - FALDA LARGA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO CON FORRO - FALDA LARGA","date":"2018-02-08","name":"COGER RUEDO CON FORRO - FALDA LARGA","item":"1","environment":"800","category":"propiedades","tipo":"alteracion"},
{"id":"COGER RUEDO SIN FORRO - FALDA LARGA","date":"2018-02-08","name":"COGER RUEDO SIN FORRO - FALDA LARGA","item":"1","environment":"650","category":"propiedades","tipo":"alteracion"},
{"id":"HACER FORROS - FALDA LARGA","date":"2018-02-08","name":"HACER FORROS - FALDA LARGA","item":"1","environment":"600","category":"propiedades","tipo":"alteracion"},
{"id":"SUBIR PRETINA - FALDA LARGA","date":"2018-02-08","name":"SUBIR PRETINA - FALDA LARGA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"PEGAR BOTONES - BLUSA","date":"2018-02-08","name":"PEGAR BOTONES - BLUSA","item":"1","environment":"200","category":"propiedades","tipo":"alteracion"},
{"id":"HACER OJALES - BLUSA","date":"2018-02-08","name":"HACER OJALES - BLUSA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"CORTAR MANGAS - BLUSA","date":"2018-02-08","name":"CORTAR MANGAS - BLUSA","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR O AMPLIAR - BLUSA","date":"2018-02-08","name":"AJUSTAR O AMPLIAR - BLUSA","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"HACER FORRO - BLUSA","date":"2018-02-08","name":"HACER FORRO - BLUSA","item":"1","environment":"600","category":"propiedades","tipo":"alteracion"},
{"id":"PIEZAS TRASERAS - BLUSA","date":"2018-02-08","name":"PIEZAS TRASERAS - BLUSA","item":"1","environment":"200","category":"propiedades","tipo":"alteracion"},
{"id":"SUBIR MANGAS HOMBROS - BLUSA","date":"2018-02-08","name":"SUBIR MANGAS HOMBROS - BLUSA","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"BAJAR O SUBIR RUEDOS SIN FORRO - BLUSA","date":"2018-02-08","name":"BAJAR O SUBIR RUEDOS SIN FORRO - BLUSA","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"BAJAR O SUBIR RUEDOS CON FORRO - BLUSA","date":"2018-02-08","name":"BAJAR O SUBIR RUEDOS CON FORRO - BLUSA","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"BLUSA","date":"2018-02-08","name":"BLUSA","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"PANTALONES","date":"2018-02-08","name":"PANTALONES","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"JEANS RUEDO - PANTALONES","date":"2018-02-08","name":"JEANS RUEDO - PANTALONES","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"JEANS CINTURA - PANTALONES","date":"2018-02-08","name":"JEANS CINTURA - PANTALONES","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"JEANS RUEDO ORIGINAL - PANTALONES","date":"2018-02-08","name":"JEANS RUEDO ORIGINAL - PANTALONES","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR PIERNAS - PANTALONES","date":"2018-02-08","name":"AJUSTAR PIERNAS - PANTALONES","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR PIERNAS - PANTALONES","date":"2018-02-08","name":"AJUSTAR PIERNAS - PANTALONES","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIOS DE CREMALLERA - PANTALONES","date":"2018-02-08","name":"CAMBIOS DE CREMALLERA - PANTALONES","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"CAMBIO DE ZIPPER - PANTALONES","date":"2018-02-08","name":"CAMBIO DE ZIPPER - PANTALONES","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"NORMAL RUEDO CON FORRO - PANTALONES","date":"2018-02-08","name":"NORMAL RUEDO CON FORRO - PANTALONES","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"NORMAL RUEDO SIN FORRO - PANTALONES","date":"2018-02-08","name":"NORMAL RUEDO SIN FORRO - PANTALONES","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"COGER CINTURA - PANTALONES","date":"2018-02-08","name":"COGER CINTURA - PANTALONES","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR - PANTALONES","date":"2018-02-08","name":"AJUSTAR - PANTALONES","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"TRAJE DE BAÑO","date":"2018-02-08","name":"TRAJE DE BAÑO","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"PONER FORRO - TRAJE DE BAÑO","date":"2018-02-08","name":"PONER FORRO - TRAJE DE BAÑO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"ESTRENAR - TRAJE DE BAÑO","date":"2018-02-08","name":"ESTRENAR - TRAJE DE BAÑO","item":"1","environment":"350","category":"propiedades","tipo":"alteracion"},
{"id":"HOMBROS - CHAQUETAS","date":"2018-02-08","name":"HOMBROS - CHAQUETAS","item":"1","environment":"750","category":"propiedades","tipo":"alteracion"},
{"id":"PINZAS - CHAQUETAS","date":"2018-02-08","name":"PINZAS - CHAQUETAS","item":"1","environment":"250","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR - CHAQUETAS","date":"2018-02-08","name":"AJUSTAR - CHAQUETAS","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR - CHAQUETAS","date":"2018-02-08","name":"AJUSTAR - CHAQUETAS","item":"1","environment":"600","category":"propiedades","tipo":"alteracion"},
{"id":"AMPLIAR - CHAQUETAS","date":"2018-02-08","name":"AMPLIAR - CHAQUETAS","item":"1","environment":"600","category":"propiedades","tipo":"alteracion"},
{"id":"RUEDOS - CHAQUETAS","date":"2018-02-08","name":"RUEDOS - CHAQUETAS","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"MANGAS DESDE ABAJO - CHAQUETAS","date":"2018-02-08","name":"MANGAS DESDE ABAJO - CHAQUETAS","item":"1","environment":"500","category":"propiedades","tipo":"alteracion"},
{"id":"MANGAS DESDE HOMBRES - CHAQUETAS","date":"2018-02-08","name":"MANGAS DESDE HOMBRES - CHAQUETAS","item":"1","environment":"800","category":"propiedades","tipo":"alteracion"},
{"id":"CHAQUETAS","date":"2018-02-08","name":"CHAQUETAS","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
{"id":"CAMISA","date":"2018-02-08","name":"CAMISA","item":"1","environment":"450","category":"servicio","tipo":"alteracion"},
{"id":"COGER HOMBROS - CAMISA","date":"2018-02-08","name":"COGER HOMBROS - CAMISA","item":"1","environment":"450","category":"propiedades","tipo":"alteracion"},
{"id":"HOMBRE - CAMISA","date":"2018-02-08","name":"HOMBRE - CAMISA","item":"1","environment":"500","category":"propiedades","tipo":"alteracion"},
{"id":"HOMBRE - CAMISA","date":"2018-02-08","name":"HOMBRE - CAMISA","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"AJUSTAR - CAMISA","date":"2018-02-08","name":"AJUSTAR - CAMISA","item":"1","environment":"400","category":"propiedades","tipo":"alteracion"},
{"id":"BOTONES - CAMISA","date":"2018-02-08","name":"BOTONES - CAMISA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"RUEDOS - CAMISA","date":"2018-02-08","name":"RUEDOS - CAMISA","item":"1","environment":"300","category":"propiedades","tipo":"alteracion"},
{"id":"PUÑOS - CAMISA","date":"2018-02-08","name":"PUÑOS - CAMISA","item":"1","environment":"0","category":"propiedades","tipo":"alteracion"},
{"id":"CAMISA DE HOMBRE","date":"2018-02-10","name":"CAMISA DE HOMBRE","item":"1","environment":"150","category":"servicio","tipo":"lavaryprensa"},
{"id":"CAMISA DE MUJER","date":"2018-02-10","name":"CAMISA DE MUJER","item":"1","environment":"150","category":"servicio","tipo":"lavaryprensa"},
{"id":"CHACABANA","date":"2018-02-10","name":"CHACABANA","item":"1","environment":"170","category":"servicio","tipo":"lavaryprensa"},
{"id":"BLUSA","date":"2018-02-10","name":"BLUSA","item":"1","environment":"115","category":"servicio","tipo":"lavaryprensa"},
{"id":"POLO T-SHIRT","date":"2018-02-10","name":"POLO T-SHIRT","item":"1","environment":"130","category":"servicio","tipo":"lavaryprensa"},
{"id":"POLO T-SHIRT CON PIEDRERIA","date":"2018-02-10","name":"POLO T-SHIRT CON PIEDRERIA","item":"1","environment":"165","category":"servicio","tipo":"lavaryprensa"},
{"id":"T-SHIRT HOMBRE","date":"2018-02-10","name":"T-SHIRT HOMBRE","item":"1","environment":"155","category":"servicio","tipo":"lavaryprensa"},
{"id":"T-SHIRT MUJER","date":"2018-02-10","name":"T-SHIRT MUJER","item":"1","environment":"105","category":"servicio","tipo":"lavaryprensa"},
{"id":"T-SHIRT HOMBRE CON PIEDREIA","date":"2018-02-10","name":"T-SHIRT HOMBRE CON PIEDREIA","item":"1","environment":"155","category":"servicio","tipo":"lavaryprensa"},
{"id":"T-SHIRT MUJER CON PIEDRERIA","date":"2018-02-10","name":"T-SHIRT MUJER CON PIEDRERIA","item":"1","environment":"155","category":"servicio","tipo":"lavaryprensa"},
];

app.get('/detail',function(req,res){

    // dba.getDetail({"category":"colores"}, function(data){
    // 	res.send(data);
    // });

    res.send(detail)

});

app.post('/detail', function(req,res){

    detail.push(req.body);
    dba.addDetail(req.body)
    res.send(req.body)
});

app.post('/deletedetail', function(req,res){

    var obj = req.body;
    //dba.removeDetail({"id":obj.id})
    detail.splice(obj.index,1);
});


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