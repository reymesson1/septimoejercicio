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

/*var list = [
"Isabella",
"Olivia",
"Alexis",
"Sofía",
"Victoria",
"Amelia",
"Alexa",
"Julia",
"Camila",
"Alexandra",
"Maya",
"Andrea",
"Ariana",
"María",
"Eva",
"Angelina",
"Valeria",
"Natalia",
"Isabel",
"Sara",
"Liliana",
"Adriana",
"Juliana",
"Gabriela",
"Daniela",
"Valentina",
"Lila",
"Vivian",
"Nora",
"Ángela",
"Elena",
"Clara",
"Eliana",
"Alana",
"Miranda",
"Amanda",
"Diana",
"Ana",
"Penélope",
"Aurora",
"Alexandría",
"Lola",
"Alicia",
"Amaya",
"Alexia",
"Jazmín",
"Mariana",
"Alina",
"Lucía",
"Fátima",
"Ximena",
"Laura",
"Cecilia",
"Alejandra",
"Esmeralda",
"Verónica",
"Daniella",
"Miriam",
"Carmen",
"Iris",
"Guadalupe",
"Selena",
"Fernanda",
"Angélica",
"Emilia",
"Lía",
"Tatiana",
"Mónica",
"Carolina",
"Jimena",
"Dulce",
"Talía",
"Estrella",
"Brenda",
"Lilian",
"Paola",
"Serena",
"Celeste",
"Viviana",
"Elisa",
"Melina",
"Gloria",
"Claudia",
"Sandra",
"Marisol",
"Asia",
"Ada",
"Rosa",
"Isabela",
"Regina",
"Elsa",
"Perla",
"Raquel",
"Virginia",
"Patricia",
"Linda",
"Marina",
"Leila",
"América",
"Mercedes",
"Daniel",
"David",
"Gabriel",
"Benjamín",
"Samuel",
"Lucas",
"Ángel",
"José",
"Adrián",
"Sebastián",
"Xavier",
"Juan",
"Luis",
"Diego",
"Óliver",
"Carlos",
"Jesús",
"Alex",
"Max",
"Alejandro",
"Antonio",
"Miguel",
"Víctor",
"Joel",
"Santiago",
"Elías",
"Iván",
"Óscar",
"Leonardo",
"Eduardo",
"Alan",
"Nicolás",
"Jorge",
"Omar",
"Paúl",
"Andrés",
"Julián",
"Josué",
"Román",
"Fernando",
"Javier",
"Abraham",
"Ricardo",
"Francisco",
"César",
"Mario",
"Manuel",
"Édgar",
"Alexis",
"Israel",
"Mateo",
"Héctor",
"Sergio",
"Emiliano",
"Simón",
"Rafael",
"Martín",
"Marco",
"Roberto",
"Pedro",
"Emanuel",
"Abel",
"Rubén",
"Fabián",
"Emilio",
"Joaquín",
"Marcos",
"Lorenzo",
"Armando",
"Adán",
"Raúl",
"Julio",
"Enrique",
"Gerardo",
"Pablo",
"Jaime",
"Saúl",
"Esteban",
"Gustavo",
"Rodrigo",
"Arturo",
"Mauricio",
"Orlando",
"Hugo",
"Salvador",
"Alfredo",
"Maximiliano",
"Ramón",
"Ernesto",
"Tobías",
"Abram",
"Noé",
"Guillermo",
"Ezequiel",
"Lucián",
"Alonzo",
"Felipe",
"Matías",
"Tomás",
"Jairo"
]*/

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
    
    for(var x=0;x<customer.length;x++){
        
        list.push(customer[x].name+' '+customer[x].apellido+' '+customer[x].telefono);
    }
    
    res.send(req.body);
})

var master = [

    {

        "date":"2017-10-16",
        "id":"1508158890082",
        "item":[{
            "development":"select",
            "firstname":"test",
            "id":1508158791550,
            "item":"react laboratory book",
            "itemDetail":[{
                "name":"Mongo Pro",
                "project":"dev.test"
            },{
                "name":"CSS Main Book",
                "project":"dev.test"
            }],
            "project":null,
            "quantity":1
        }],
        "name":"test",
        "project":null,
        "status":"pending"
    },{

        "date":"2017-10-16",
        "id":"1508158890083",
        "item":[{
            "development":"select",
            "firstname":"test",
            "id":1508158791550,
            "item":"react laboratory book",
            "itemDetail":[{
                "name":"Mongo Pro",
                "project":"dev.test"
            },{
                "name":"CSS Main Book",
                "project":"dev.test"
            }],
            "project":null,
            "quantity":1
        }],
        "name":"test",
        "project":null,
        "status":"waiting"
    }
];

app.get('/masterAPI', function(req,res){


    res.send(master);
})

app.get('/master', function(req,res){


    var filteredTable = master.filter(
            (pending) => pending.status.indexOf('pending') !== -1
    )

    res.send(filteredTable);
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
    master.push(req.body);
});


app.post('/deletemaster', function(req,res){

    var index = req.body.id;

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
{id: "Camino", date: "2017-10-14", name: "Camino", item: "10000", environment: "250","category":"servicio"},
{id: "Blanco", date: "2017-10-14", name: "Blanco", item: "0", environment: "0","category":"colores"},
{id: "Lino", date: "2017-10-14", name: "Lino", item: "50", environment: "50","category":"propiedades"},
];

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

app.post('/loader',function(req,res){
    console.log(req.body)
    res.send(req.body);
})

app.get('/logout',function(req,res){

    cookies = false;
    res.redirect('/');
});

app.listen(80);