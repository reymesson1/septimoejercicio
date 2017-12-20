var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'))

var dba = require('./lib/dba-helper.js')();

app.use(bodyParser.json());

var cookies = true;

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

var customer = [];
var list = [];

app.get('/list',function(req,res){
        
    res.send(list);
})


app.get('/customer',function(req,res){
    
    res.send(customer);
    
});

app.post('/customer',function(req,res){
    
    customer.push(req.body);
    //dba.addCustomer(req.body);    
    for(var x=0;x<customer.length;x++){
        
        //list.push(customer[x].name+' '+customer[x].apellido);
        list.push(customer[x].telefono);
    }
    
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

var detail = [
{id: "Abrigo", date:"2017-10-14",environment:"250",item:"10000",name:"Abrigo","category":"servicio"},
{id: "Alas mariposas", date: "2017-10-14", name: "Alas mariposas", item: "10000", environment: "250","category":"servicio"},
{id: "Alfombras", date: "2017-10-14", name: "Alfombras", item: "1000", environment: "250","category":"servicio"},
{id: "Bata", date: "2017-10-14", name: "Bata", item: "10000", environment: "250","category":"servicio"},
{id: "Bandera", date: "2017-10-14", name: "Bandera", item: "10000", environment: "250","category":"servicio"},
{id: "Bata de Laboratorio", date: "2017-10-14", name: "Bata de Laboratorio", item: "100000", environment: "250","category":"servicio"},
{id: "Birrete", date: "2017-10-14", name: "Birrete", item: "100000", environment: "250","category":"servicio"},
{id: "Bulto de tela", date: "2017-10-14", name: "Bulto de tela", item: "100000", environment: "250","category":"servicio"},
{id: "Blusa", date: "2017-10-14", name: "Blusa", item: "100000", environment: "250","category":"servicio"},
{id: "Camino", date: "2017-10-14", name: "Camino", item: "10000", environment: "250","category":"servicio"},
{id: "Blanco", date: "2017-10-14", name: "Blanco", item: "0", environment: "0","category":"colores"},
{id: "Lino", date: "2017-10-14", name: "Lino", item: "50", environment: "50","category":"propiedades"},
];

app.get('/detail',function(req,res){

    dba.getDetail({"category":"servicio"}, function(data){
    	res.send(data);
    });

    res.send(detail);
});

app.post('/detail', function(req,res){

    detail.push(req.body);
    //dba.addDetail(req.body)
    res.send(req.body)
});

app.post('/deletedetail', function(req,res){

    var obj = req.body;
    //dba.removeDetail({"id":obj.id})
    detail.splice(obj.index,1);
});

app.post('/updatedetail',function(req,res){
    var obj = req.body;
    detail[obj.index].item=obj.item;
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

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});

app.listen(8082);
