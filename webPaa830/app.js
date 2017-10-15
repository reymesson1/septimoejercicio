var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'))

var dba = require('./lib/dba-helper.js')();

app.use(bodyParser.json());

var cookies = false;

app.get('/cookies', function(req,res){

    res.send(cookies);
});

app.post('/cookies', function(req,res){

    var newCookie = req.body;

    if(newCookie.username=='mechy'){
        console.log(req.body);
        cookies=true;
    }
});

var master = [];

app.get('/master', function(req,res){

    res.send(master);
})

app.post('/master', function(req,res){

    //dba.addMaster(req.body);
    master.push(req.body);
});

app.post('/deletemaster', function(req,res){

    var index = req.body;
    master.splice(index,1);
});


app.get('/reporte', function(req,res){

    /*dba.getMaster({}, function(data){

        res.send(data);

    });*/
    res.send(master)

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
{id: "Camino", date: "2017-10-14", name: "Camino", item: "10000", environment: "250","category":"servicio"}];

app.get('/detail',function(req,res){
 
    /*dba.getDetail({}, function(data){
	    res.send(data);
    });*/
    res.send(detail)
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

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});

app.listen(80);
