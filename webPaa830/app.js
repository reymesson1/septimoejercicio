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

var detail = [{"_id":"59f696863dd30aa07d687699","id":"Abrigo","date":"2017-10-14","environment":"250","item":"10000","name":"Abrigo","category":"servicio"},{"_id":"59f696933dd30aa07d68769a","id":"Abrigo","date":"2017-10-14","environment":"250","item":"10000","name":"Abrigo","category":"servicio"},{"_id":"59f696993dd30aa07d68769b","id":"Alas mariposas","date":"2017-10-14","name":"Alas mariposas","item":"10000","environment":"250","category":"servicio"},{"_id":"59f6969f3dd30aa07d68769c","id":"Alfombras","date":"2017-10-14","name":"Alfombras","item":"1000","environment":"250","category":"servicio"},{"_id":"59f696a33dd30aa07d68769d","id":"Bata de Laboratorio","date":"2017-10-14","name":"Bata de Laboratorio","item":"100000","environment":"250","category":"servicio"},{"_id":"59f696a73dd30aa07d68769e","id":"Birrete","date":"2017-10-14","name":"Birrete","item":"100000","environment":"250","category":"servicio"},{"_id":"59fe2f044133d62d3b1c5bbd","id":"PANTALON","date":"2017-11-04","name":"PANTALON","item":"1","environment":"350","category":"servicio"},{"_id":"5a14be37f2ae746cc819dd99","id":"Traje de baño","date":"2017-11-21","name":"Traje de baño","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bee2f2ae746cc819dd9a","id":"TRAJES 2 PIEZAS","date":"2017-11-21","name":"TRAJES 2 PIEZAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14befdf2ae746cc819dd9b","id":"VESTIDO","date":"2017-11-21","name":"VESTIDO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bf1df2ae746cc819dd9c","id":"VESTIDO CORTO","date":"2017-11-21","name":"VESTIDO CORTO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bf3ff2ae746cc819dd9d","id":"VESTIDO DE NINA","date":"2017-11-21","name":"VESTIDO DE NINA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bf71f2ae746cc819dd9e","id":"VESTIDO DE NINA","date":"2017-11-21","name":"VESTIDO DE NINA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bfa6f2ae746cc819dd9f","id":"VESTIDO GALA CON ADORNO","date":"2017-11-21","name":"VESTIDO GALA CON ADORNO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bfc8f2ae746cc819dda0","id":"VESTIDO GALA SIN ADORNO","date":"2017-11-21","name":"VESTIDO GALA SIN ADORNO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bfe7f2ae746cc819dda1","id":"TOALLA","date":"2017-11-21","name":"TOALLA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14bff6f2ae746cc819dda2","id":"TOGA","date":"2017-11-21","name":"TOGA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c01ef2ae746cc819dda3","id":"TOGA CORTA","date":"2017-11-21","name":"TOGA CORTA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c04af2ae746cc819dda4","id":"TRAJE DE 3 PIEZAS","date":"2017-11-21","name":"TRAJE DE 3 PIEZAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c072f2ae746cc819dda5","id":"SERVICIO LAVANDERÍA","date":"2017-11-21","name":"SERVICIO LAVANDERÍA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c088f2ae746cc819dda6","id":"SERVILLETAS","date":"2017-11-21","name":"SERVILLETAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c0a5f2ae746cc819dda7","id":"SHORT","date":"2017-11-21","name":"SHORT","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c0b7f2ae746cc819dda8","id":"SMOKING","date":"2017-11-21","name":"SMOKING","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c0d1f2ae746cc819dda9","id":"SOMBRERO","date":"2017-11-21","name":"SOMBRERO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c0eff2ae746cc819ddaa","id":"T-SHIRT","date":"2017-11-21","name":"T-SHIRT","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c10ef2ae746cc819ddab","id":"ROPA INTERIOR","date":"2017-11-21","name":"ROPA INTERIOR","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c12ff2ae746cc819ddac","id":"SABANA KING","date":"2017-11-21","name":"SABANA KING","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c14cf2ae746cc819ddad","id":"SABANA QUEEN","date":"2017-11-21","name":"SABANA QUEEN","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c165f2ae746cc819ddae","id":"SABANAS","date":"2017-11-21","name":"SABANAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c18df2ae746cc819ddaf","id":"SALIDA DE PLAYA","date":"2017-11-21","name":"SALIDA DE PLAYA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c1a8f2ae746cc819ddb0","id":"PAÑO","date":"2017-11-21","name":"0","item":"","environment":"","category":"servicio"},{"_id":"5a14c1bef2ae746cc819ddb1","id":"PAÑO","date":"2017-11-21","name":"PAÑO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c1eef2ae746cc819ddb2","id":"PELUCHE","date":"2017-11-21","name":"PELUCHE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c20af2ae746cc819ddb3","id":"PIJAMAS","date":"2017-11-21","name":"PIJAMAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c22bf2ae746cc819ddb4","id":"POLO SHIRT","date":"2017-11-21","name":"POLO SHIRT","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c242f2ae746cc819ddb5","id":"REFAJO","date":"2017-11-21","name":"REFAJO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c261f2ae746cc819ddb6","id":"ROPA INTERIOR","date":"2017-11-21","name":"ROPA INTERIOR","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c27cf2ae746cc819ddb7","id":"OVEROL","date":"2017-11-21","name":"OVEROL","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c2a8f2ae746cc819ddb8","id":"PANTALON MUJER","date":"2017-11-21","name":"PANTALON MUJER","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c2bef2ae746cc819ddb9","id":"PANTALON NINO","date":"2017-11-21","name":"PANTALON NINO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c2e1f2ae746cc819ddba","id":"PAÑUELO","date":"2017-11-21","name":"PAÑUELO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c309f2ae746cc819ddbb","id":"MANTEL GRANDE","date":"2017-11-21","name":"MANTEL GRANDE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c325f2ae746cc819ddbc","id":"MANTEL MEDIANO","date":"2017-11-21","name":"MANTEL MEDIANO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c33ef2ae746cc819ddbd","id":"MANTEL PEQ.","date":"2017-11-21","name":"MANTEL PEQ.","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c365f2ae746cc819ddbe","id":"MEDIA","date":"2017-11-21","name":"MEDIA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c37df2ae746cc819ddbf","id":"NOVIEMBRE","date":"2017-11-21","name":"NOVIEMBRE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c39ff2ae746cc819ddc0","id":"FUNDA DE ALMOHADA","date":"2017-11-21","name":"FUNDA DE ALMOHADA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c3b7f2ae746cc819ddc1","id":"GORRA","date":"2017-11-21","name":"GORRA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c3d1f2ae746cc819ddc2","id":"INDIVIDUAL","date":"2017-11-21","name":"INDIVIDUAL","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c3e7f2ae746cc819ddc3","id":"JACKET","date":"2017-11-21","name":"JACKET","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c408f2ae746cc819ddc4","id":"JONSUIT","date":"2017-11-21","name":"JONSUIT","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c432f2ae746cc819ddc5","id":"MANDOLES","date":"2017-11-21","name":"MANDOLES","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c44ef2ae746cc819ddc6","id":"FORRO DE CARRO","date":"2017-11-21","name":"FORRO DE CARRO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c470f2ae746cc819ddc7","id":"FORRO MUNET","date":"2017-11-21","name":"FORRO MUNET","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c492f2ae746cc819ddc8","id":"FAJA","date":"2017-11-21","name":"FAJA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c4aaf2ae746cc819ddc9","id":"FALDA","date":"2017-11-21","name":"FALDA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c4c7f2ae746cc819ddca","id":"FALDA LARGA","date":"2017-11-21","name":"FALDA LARGA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c4e9f2ae746cc819ddcb","id":"FORRO DE ROPA","date":"2017-11-21","name":"FORRO DE ROPA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c50bf2ae746cc819ddcc","id":"FORRO DUVET","date":"2017-11-21","name":"FORRO DUVET","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c527f2ae746cc819ddcd","id":"CORTINAS","date":"2017-11-21","name":"CORTINAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c53df2ae746cc819ddce","id":"CORTINAS GRANDE","date":"2017-11-21","name":"CORTINAS GRANDE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c560f2ae746cc819ddcf","id":"COUT O ABRIGO LARGO","date":"2017-11-21","name":"COUT O ABRIGO LARGO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c582f2ae746cc819ddd0","id":"CUBRE COLCHON","date":"2017-11-21","name":"CUBRE COLCHON","item":"CUBRE COLCHON","environment":"0","category":"servicio"},{"_id":"5a14c5a4f2ae746cc819ddd1","id":"CORBATA","date":"2017-11-21","name":"CORBATA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c5bcf2ae746cc819ddd2","id":"CORCHA PEQ","date":"2017-11-21","name":"CORCHA PEQ","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c5d6f2ae746cc819ddd3","id":"CORTINA LISA PEQ","date":"2017-11-21","name":"CORTINA LISA PEQ","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c5f0f2ae746cc819ddd4","id":"CORTINA MEDIANA","date":"2017-11-21","name":"CORTINA MEDIANA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c630f2ae746cc819ddd5","id":"CORTINA GRUESA","date":"2017-11-21","name":"CORTINA GRUESA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c66cf2ae746cc819ddd6","id":"COLCHA GRUESA Q K","date":"2017-11-21","name":"COLCHA GRUESA Q K","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c6a1f2ae746cc819ddd7","id":"COLCHA GRUESA F T","date":"2017-11-21","name":"COLCHA GRUESA F T","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c6f0f2ae746cc819ddd8","id":"COLCHA SENCILLA","date":"2017-11-21","name":"COLCHA SENCILLA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c710f2ae746cc819ddd9","id":"COLCHA SENCILLA F T","date":"2017-11-21","name":"COLCHA SENCILLA F T","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c728f2ae746cc819ddda","id":"COLCHA SENCILLA Q K","date":"2017-11-21","name":"COLCHA SENCILLA Q K","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c74af2ae746cc819dddb","id":"CONJUNTO 2/PIEZAS","date":"2017-11-21","name":"CONJUNTO 2/PIEZAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c788f2ae746cc819dddc","id":"CONJUNTO 3/PIEZAS","date":"2017-11-21","name":"CONJUNTO 3/PIEZAS","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c7b1f2ae746cc819dddd","id":"CHALECO","date":"2017-11-21","name":"CHALECO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c7cef2ae746cc819ddde","id":"CHAQUETA DE HOMBRE","date":"2017-11-21","name":"CHAQUETA DE HOMBRE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c7e1f2ae746cc819dddf","id":"CHAQUETA DE MUJER","date":"2017-11-21","name":"CHAQUETA DE MUJER","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c808f2ae746cc819dde0","id":"CHAQUETA DE  NINO","date":"2017-11-21","name":"CHAQUETA DE  NINO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c840f2ae746cc819dde1","id":"COJINES","date":"2017-11-21","name":"COJINES","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c861f2ae746cc819dde2","id":"COLCHA GRUESA F T","date":"2017-11-21","name":"COLCHA GRUESA F T","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c880f2ae746cc819dde3","id":"BULTO DE TELA","date":"2017-11-21","name":"BULTO DE TELA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c894f2ae746cc819dde4","id":"CAMINO","date":"2017-11-21","name":"CAMINO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c8b6f2ae746cc819dde5","id":"CAMISA MC","date":"2017-11-21","name":"CAMISA MC","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c8d7f2ae746cc819dde6","id":"CAPA","date":"2017-11-21","name":"CAPA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c8f3f2ae746cc819dde7","id":"CHACABANA","date":"2017-11-21","name":"CHACABANA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c914f2ae746cc819dde8","id":"BUFANDA","date":"2017-11-21","name":"BUFANDA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c934f2ae746cc819dde9","id":"BULTO DE TELA","date":"2017-11-21","name":"BULTO DE TELA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c963f2ae746cc819ddea","id":"BODY CON FALDA","date":"2017-11-21","name":"BODY CON FALDA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c993f2ae746cc819ddeb","id":"BLUSA","date":"2017-11-21","name":"BLUSA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c9b4f2ae746cc819ddec","id":"BIRRETE","date":"2017-11-21","name":"BIRRETE","item":"1","environment":"0","category":"servicio"},{"_id":"5a14c9d4f2ae746cc819dded","id":"BERMUDA","date":"2017-11-21","name":"BERMUDA","item":"1","environment":"0","category":"servicio"},{"_id":"5a14ca04f2ae746cc819ddee","id":"BANDERINES","date":"2017-11-21","name":"BANDERINES","item":"1","environment":"0","category":"servicio"},{"_id":"5a14ca51f2ae746cc819ddef","id":"BOTON DAÑADO","date":"2017-11-21","name":"BOTON DAÑADO","item":"1","environment":"0","category":"servicio"},{"_id":"5a14cafaf2ae746cc819ddf3","id":"ZURCIDO","date":"2017-11-21","name":"ZURCIDO","item":"1","environment":"200","category":"servicio"},{"_id":"5a14cb28f2ae746cc819ddf4","id":"AJUSTAR FORRO","date":"2017-11-21","name":"AJUSTAR FORRO","item":"1","environment":"200","category":"servicio"},{"_id":"5a14ccecf2ae746cc819ddfd","id":"DESHILADO","date":"2017-11-21","name":"DESHILADO","item":"1","environment":"150","category":"servicio"},{"_id":"5a14ce48f2ae746cc819de05","id":"ENCAJE","date":"2017-11-21","name":"ENCAJE","item":"1","environment":"50","category":"servicio"}]

app.get('/detail',function(req,res){

    dba.getDetail({"category":"colores"}, function(data){
    	res.send(data);
    });

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
