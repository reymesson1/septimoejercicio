var express = require('express');

var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'))

var dba = require('./lib/dba-helper.js')();

var moment = require('moment');

app.use(bodyParser.json());

var cookies = true;

var today = moment(new Date()).format('YYYY-MM-DD');

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

var customer = [{"id":1513900726883,"name":"Erick","apellido":"Groba","telefono":"","rnc":"","fechacumpleano":"2017-12-21","facebook":"","correoelectronico":"","descuento":"0","date":"2018-01-06"},{"id":1513949265957,"name":"Astrid ","apellido":"Perez","telefono":"8099639495","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0"},{"id":1513949349557,"name":"Zamilda","apellido":"De Leon","telefono":"8095412636","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0"},{"id":1513949388707,"name":"Fernando ","apellido":"Garcia","telefono":"8092223660","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0"},{"id":1513949463299,"name":"Cesar","apellido":"De Jesus","telefono":"8096703629","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"1"},{"id":1513949774901,"name":"Ricki ","apellido":"Mendoza","telefono":"8093538471","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0"},{"id":1514050397549,"name":"Elizabeth","apellido":"Flete","telefono":"8099735393","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-23"},{"id":1514050454026,"name":"Sue","apellido":"Sanchez","telefono":"8294715003","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-23"},{"id":1514050522161,"name":"Susana","apellido":"Tapia","telefono":"8294217104","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-23"},{"id":1514050970220,"name":"Lola ","apellido":"Gonzalez","telefono":"8096162407","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-23"},{"id":1514390045719,"name":"Annia","apellido":"Vasquez","telefono":"8095654388 8096502005","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514390404869,"name":"Lorenna ","apellido":"Crespo","telefono":"8498067401","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514390445608,"name":"Jorge ","apellido":"Melo","telefono":"8099071064","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514390517698,"name":"Antonio","apellido":"Aragon","telefono":"8092580765","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514392821202,"name":"Reynaldo ","apellido":"Diaz","telefono":"8092233321","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514393246166,"name":"Paul Zacarias","apellido":"Fashion Brands","telefono":"8092277868 8294515058","rnc":"131392237","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514393298658,"name":"Obet","apellido":"Mena","telefono":"8094317157","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514393439067,"name":"Milagros","apellido":"De Perez","telefono":"8095663822","rnc":"","fechacumpleano":"0001-06-07","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514394094814,"name":"Octavia ","apellido":"Negrin","telefono":"8296030067","rnc":"","fechacumpleano":"0001-07-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514399455305,"name":"Astrid ","apellido":"Perez","telefono":"809 916-9495","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514399705795,"name":"Fernando","apellido":"Garcia","telefono":"8092223660","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514399850487,"name":"Cesar","apellido":"De Jesus","telefono":"809 670-3629","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514400029387,"name":"enc","apellido":"Groba","telefono":"809 855-5531","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514400090040,"name":"Elizabeth","apellido":"Flete","telefono":"809 973-5393","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514400203660,"name":"sue","apellido":"sanchez","telefono":"829 471-5003","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514400369231,"name":"Lolo","apellido":"Gonzalez","telefono":"809 616-2407","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514400548926,"name":"Emilio","apellido":"Baez","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514401740320,"name":"lourdes","apellido":"Ogado","telefono":"809 519-1307","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514401789894,"name":"Martha","apellido":"Arias","telefono":"829 344-5499","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403109956,"name":"Mirian","apellido":"Parra","telefono":"829 560-1280","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403238204,"name":"Maribel","apellido":"sanchez","telefono":"809 804-8044","rnc":"","fechacumpleano":"0001-12-02","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403290252,"name":"Maylen","apellido":"Cuello","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403358079,"name":"Roberto","apellido":"Dominguez","telefono":"829 573-2850","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403427201,"name":"Nathalia","apellido":"Tejeda","telefono":"809 707-1276","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514403537093,"name":"Ayadelkis","apellido":"Paulino","telefono":"809 223-1250","rnc":"","fechacumpleano":"0001-02-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514404860049,"name":"Danilo","apellido":"Monegro","telefono":"829 679-6822","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514404961729,"name":"Wenndy","apellido":"Tavarez","telefono":"809 560-8638","rnc":"","fechacumpleano":"0001-02-02","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405015397,"name":"Idramary","apellido":"Grullon","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405098324,"name":"Luchi","apellido":"Batista","telefono":"809 882-2130","rnc":"","fechacumpleano":"0001-12-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405151644,"name":"Rosmeri","apellido":"Suero","telefono":"809 446-4056","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405215897,"name":"Yarquis","apellido":"Espinal","telefono":"809 383-2765","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405266552,"name":"Iris ","apellido":"Bermudez","telefono":"809 723-3608","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405320392,"name":"Emilio","apellido":"Garrido","telefono":"809 224-8025","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405374311,"name":"Mercesdes","apellido":"Gil","telefono":"809 224-0035","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405409198,"name":"Rossi","apellido":"Perez","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405458799,"name":"Ricardo","apellido":"Guzman","telefono":"809 732-2707","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405551546,"name":"Natanael ","apellido":"Dinzey","telefono":"809 284-9425","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405613213,"name":"Edita","apellido":"Melo","telefono":"809 306-4323","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514405658587,"name":"Maria","apellido":"Morel","telefono":"809 657-7764","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406292159,"name":"Wenndy","apellido":"Fernandez","telefono":"809 548-6045","rnc":"","fechacumpleano":"0001-09-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406438709,"name":"Jose ","apellido":"Puello","telefono":"829 563-6800","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406568171,"name":"Johany","apellido":"Villataña","telefono":"829 986-8696","rnc":"","fechacumpleano":"0001-11-08","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406654763,"name":"Reinaldo","apellido":"Diaz","telefono":"809 223-3321","rnc":"","fechacumpleano":"0001-03-04","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406768846,"name":"Laura","apellido":"Freitas","telefono":"809 542-6443","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406865579,"name":"Joanna","apellido":"Garzon","telefono":"829 658-9000","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406928380,"name":"Karina","apellido":"Rojas","telefono":"829 8687943","rnc":"","fechacumpleano":"0001-01-10","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514406980790,"name":"Johanna","apellido":"Garzon","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407019641,"name":"Johanna","apellido":"Garzon","telefono":"829 688-9000","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407135066,"name":"Monica","apellido":"Mañon","telefono":"809 708-6753","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407208232,"name":"Jenni","apellido":"Soldi","telefono":"809 467-0090","rnc":"","fechacumpleano":"0001-09-25","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407274310,"name":"Cinthia","apellido":"Gonzales","telefono":"829 754-9006","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407363070,"name":"Marjorie","apellido":"Gracie","telefono":"829 493-8064","rnc":"","fechacumpleano":"0001-10-10","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407657423,"name":"Lisset","apellido":"Bobadilla","telefono":"829 352-1410","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407720563,"name":"Yuddit","apellido":"Fernandez","telefono":"809 566-0687","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407860819,"name":"Tesalia","apellido":"Ferreira","telefono":"809 876-1130","rnc":"","fechacumpleano":"0001-04-28","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514407942218,"name":"Jose ","apellido":"Ramirez","telefono":"809 368-4700","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408001079,"name":"Henry","apellido":"Rosario","telefono":"829 986-4108","rnc":"","fechacumpleano":"0001-09-04","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408062778,"name":"Alfonso","apellido":"Grosa","telefono":"809 541-5342","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408140313,"name":"Cricic","apellido":"Groba","telefono":"809 855-5531","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408261137,"name":"Jose ","apellido":"Almonte","telefono":"829 936-3212","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408329382,"name":"Luis ","apellido":"Despradel","telefono":"829 421-4026","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408389346,"name":"Rosanna","apellido":"Encarnacion","telefono":"809 918-8213","rnc":"","fechacumpleano":"0001-09-06","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408457588,"name":"Fidelina","apellido":"Valenzuela","telefono":"829 567-6820","rnc":"","fechacumpleano":"0001-05-23","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408555962,"name":"Juan","apellido":"Miguel Herrera","telefono":"829 701-1458","rnc":"","fechacumpleano":"0001-10-27","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408650591,"name":"Laura","apellido":"Freitas","telefono":"809 542-6443","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408735235,"name":"Johanni","apellido":"Cuevas","telefono":"809 278-4039","rnc":"","fechacumpleano":"0001-03-09","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408815470,"name":"SR. Alejandra","apellido":"Silvestre","telefono":"809 803-6221","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408870307,"name":"Pedro","apellido":"Ledesma","telefono":"809 330-1874","rnc":"","fechacumpleano":"0001-05-17","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514408950845,"name":"Emiliana","apellido":"Peña","telefono":"809 910-0424","rnc":"","fechacumpleano":"0001-06-30","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409011122,"name":"Rodolfo","apellido":"Vargas","telefono":"809 763-2166","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409047133,"name":"Rodolfo","apellido":"Vargas","telefono":"","rnc":"","fechacumpleano":"0001-09-08","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409140894,"name":"Angel","apellido":"Lockward","telefono":"829 649-9177","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409208179,"name":"Carla","apellido":"Velasquez","telefono":"829 932-0512","rnc":"","fechacumpleano":"0001-12-01","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409260112,"name":"Claudia","apellido":"Diaz","telefono":"829 994-2291","rnc":"","fechacumpleano":"0001-10-21","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409317578,"name":"Larissa","apellido":"Rodriguez","telefono":"809 917-2793","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409412956,"name":"Yacqueline","apellido":"Frias","telefono":"","rnc":"","fechacumpleano":"0001-12-16","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409476488,"name":"Josefina","apellido":"Lirio","telefono":"809 732-9575","rnc":"","fechacumpleano":"0001-03-09","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409549844,"name":"Alondra","apellido":"Cineros","telefono":"829 629-1144","rnc":"","fechacumpleano":"0001-10-29","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409629175,"name":"Ing. Carlos","apellido":"Porchella","telefono":"829 846-6161","rnc":"","fechacumpleano":"0001-01-08","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409694296,"name":"Jenni","apellido":"Acosta","telefono":"809 480-5865","rnc":"","fechacumpleano":"0001-11-09","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409756575,"name":"Leonidas","apellido":"Henriquez","telefono":"829 343-0616","rnc":"","fechacumpleano":"0001-01-26","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409827285,"name":"Monserrate","apellido":"Fray","telefono":"829 228-9973","rnc":"","fechacumpleano":"0001-11-10","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514409897489,"name":"Lisbet","apellido":"Peralta","telefono":"829 970-9317","rnc":"","fechacumpleano":"0001-10-24","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410011498,"name":"Elena","apellido":"Pedemonte","telefono":"809 696-2148","rnc":"","fechacumpleano":"0001-11-20","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410420817,"name":"Alvaro","apellido":"Rincon","telefono":"809 501-0935","rnc":"","fechacumpleano":"0001-10-27","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410545326,"name":"Laura","apellido":"Freitas","telefono":"809 542-6443","rnc":"","fechacumpleano":"0001-12-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410603651,"name":"Doris","apellido":"Cruz","telefono":"809 876-1515","rnc":"","fechacumpleano":"0001-04-15","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410669541,"name":"Ronald","apellido":"Diaz","telefono":"809 390-3317","rnc":"","fechacumpleano":"0001-07-30","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410729459,"name":"Eduardo","apellido":"sanchez","telefono":"829 204-0907","rnc":"","fechacumpleano":"0001-02-04","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410827986,"name":"Grissel","apellido":"Rodriguez","telefono":"809 729-7383","rnc":"","fechacumpleano":"0001-03-08","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410912865,"name":"Annelte","apellido":"Beltre","telefono":"809 6974783","rnc":"","fechacumpleano":"0001-08-19","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514410972479,"name":"Anny","apellido":"Perez","telefono":"809 907-6368","rnc":"","fechacumpleano":"0001-12-27","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411030726,"name":"Jenifer","apellido":"Solander","telefono":"849 220-1390","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411104444,"name":"Judit","apellido":"Betancos","telefono":"809 383-4962","rnc":"","fechacumpleano":"0001-03-28","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411257855,"name":"Luis ","apellido":"Marcel","telefono":"829 763-5906","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411303498,"name":"Darlin","apellido":"Rodriguez","telefono":"809 949-8852","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411362729,"name":"Melissa","apellido":"Custodia","telefono":"809 862-0094","rnc":"","fechacumpleano":"0001-07-02","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411418358,"name":"Nicol","apellido":"Gerrero","telefono":"809 495-8605","rnc":"","fechacumpleano":"0001-10-02","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411446803,"name":"Pamela","apellido":"Ledesma","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411573353,"name":"Elasa","apellido":"Amaxa","telefono":"829 342-8991","rnc":"1010711291","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411618705,"name":"Lenin ","apellido":"Valdez","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411651641,"name":"Lenin ","apellido":"Valdez","telefono":"","rnc":"","fechacumpleano":"0001-06-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411735011,"name":"Elasa","apellido":"Amaya","telefono":"829 342-8991","rnc":"1010711291","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411802361,"name":"Susy ","apellido":"Matos","telefono":"809 732-6309","rnc":"","fechacumpleano":"0001-09-18","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411853575,"name":"Anell","apellido":"Abreu","telefono":"829 887-7860","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411912372,"name":"Carolina","apellido":"Lizardo","telefono":"829 912-1255","rnc":"","fechacumpleano":"0001-07-24","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514411985206,"name":"Yudith","apellido":"Lora","telefono":"829 374-7781","rnc":"","fechacumpleano":"0001-02-07","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412043018,"name":"Marlenne","apellido":"Jimenez","telefono":"809 757-7296","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412138633,"name":"Paola","apellido":"Morales","telefono":"829 380-3139","rnc":"","fechacumpleano":"0001-02-24","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412201326,"name":"Joan","apellido":"Prats","telefono":"809 258-5272","rnc":"","fechacumpleano":"0001-02-04","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412248885,"name":"Deyanira","apellido":"Sosa","telefono":"809 791-7382","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412310357,"name":"Hilcia","apellido":"Ferrua","telefono":"829 664-9777","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412377612,"name":"Maximo","apellido":"Sabala","telefono":"829 340-2633","rnc":"","fechacumpleano":"0001-06-21","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412439903,"name":"Ana Maria","apellido":"Barcelo","telefono":"809 883-7080","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412514638,"name":"Jose ","apellido":"Augusto Reyes","telefono":"849 650-3057","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412569400,"name":"Kimberlin","apellido":"Martes","telefono":"829 278-0163","rnc":"","fechacumpleano":"0001-10-30","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412618630,"name":"Betty","apellido":"Amparo","telefono":"809 980-9552","rnc":"","fechacumpleano":"0001-04-29","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412676159,"name":"Olga","apellido":"Graciela","telefono":"809 712-8501","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412823024,"name":"Angel de la","apellido":"Huerga","telefono":"809 449-8502","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514412870347,"name":"Julio","apellido":"Marmolejos","telefono":"809 869-8939","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413297494,"name":"Odila","apellido":"Hidalgo","telefono":"829 989-1284","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413340332,"name":"Emilio","apellido":"Pana","telefono":"829 333-1485","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413376248,"name":"Antonio","apellido":"Aragon","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413445886,"name":"Mayi","apellido":"Hilario","telefono":"809 867-0199","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413598444,"name":"Victor","apellido":"Martinez","telefono":"829 918-1918","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413647037,"name":"Marcos","apellido":"Geraldino","telefono":"829 915-8050","rnc":"","fechacumpleano":"0001-01-14","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413724146,"name":"Marjorie","apellido":"Gracia","telefono":"829 493-8069","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413776159,"name":"Carlos","apellido":"Matos","telefono":"849 873-4483","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514413962175,"name":"Alejandra","apellido":"Jimenez","telefono":"829 258-1272","rnc":"","fechacumpleano":"0001-02-19","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414039940,"name":"Jhonayra","apellido":"Suero","telefono":"809 473-9202","rnc":"","fechacumpleano":"0001-04-26","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414106004,"name":"emil ","apellido":"kasse","telefono":"809 683-1762","rnc":"","fechacumpleano":"0001-02-22","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414160361,"name":"Nicol","apellido":"Gerrero","telefono":"809 495-8605","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414360235,"name":"Carlos","apellido":"Mateo","telefono":"849 873-4483","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414435100,"name":"Grilman","apellido":"Ramos","telefono":"809 850-0784","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414492894,"name":"Zaydi","apellido":"Vasquez","telefono":"809 540-0746","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414549314,"name":"Noelia","apellido":"Fernandez","telefono":"829 548-9101","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414611957,"name":"Carla","apellido":"Gonzalez","telefono":"809 334-6186","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414698930,"name":"Judit","apellido":"Betances","telefono":"809 383-4962","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414748828,"name":"Melissa","apellido":"Custodia","telefono":"809 862-0094","rnc":"","fechacumpleano":"0001-06-02","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414858015,"name":"Cleo","apellido":"Fernandez","telefono":"809 804-0038","rnc":"","fechacumpleano":"0001-12-29","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414898782,"name":"Cristina","apellido":"Rosario","telefono":"","rnc":"","fechacumpleano":"0001-12-18","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514414931269,"name":"Pamela","apellido":"Ceara","telefono":"849 ","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416353853,"name":"Pamela","apellido":"Ceara","telefono":"809 849-4998","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416417847,"name":"Milagros","apellido":"D Perez","telefono":"809 566-3822","rnc":"","fechacumpleano":"0001-08-19","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416462205,"name":"Clara","apellido":"Disla","telefono":"829 329-6823","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416558353,"name":"Maura","apellido":"Biano","telefono":"829 766-1313","rnc":"","fechacumpleano":"0001-02-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416604804,"name":"Maira","apellido":"Bueno","telefono":"829 766-1313","rnc":"","fechacumpleano":"0001-02-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416680965,"name":"Isabel","apellido":"Bello","telefono":"809 654-5504","rnc":"","fechacumpleano":"0001-06-01","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416734305,"name":"Sagradio","apellido":"Diaz","telefono":"809 852-3387","rnc":"","fechacumpleano":"0001-10-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416806965,"name":"Altagracia","apellido":"D serretti","telefono":"809 567-4396","rnc":"","fechacumpleano":"0001-05-15","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416848610,"name":"Isidro","apellido":"Santos","telefono":"829 382-0781","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416912744,"name":"Magalis","apellido":"Nuñez","telefono":"809 915-406","rnc":"","fechacumpleano":"0001-04-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514416989622,"name":"Violetta","apellido":"Rosario ","telefono":"809 540-1276","rnc":"","fechacumpleano":"0001-12-23","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514417047695,"name":"Jenifer","apellido":"Solange","telefono":"849 220-1390","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514417230930,"name":"Jenni","apellido":"Soldi","telefono":"809 472-0090","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-27"},{"id":1514648928462,"name":"Juan De Jesus","apellido":"Ortiz","telefono":"8096199918","rnc":"","fechacumpleano":"0001-02-19","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514648995228,"name":"Jose ","apellido":"Cepeda","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649088256,"name":"Leidy","apellido":"Rodriguez","telefono":"8095657455","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649155810,"name":"Rina","apellido":"Marion","telefono":"8096962282","rnc":"","fechacumpleano":"0001-10-27","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649441826,"name":"Palma","apellido":"Ruiz","telefono":"8292011954","rnc":"","fechacumpleano":"0001-04-14","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649548922,"name":"Roselia","apellido":"Valenzuela","telefono":"2894716697","rnc":"","fechacumpleano":"0001-08-29","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649615532,"name":"Isabel ","apellido":"Bello","telefono":"8096545504","rnc":"","fechacumpleano":"0001-07-01","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649681962,"name":"Elena ","apellido":"Gonzalez","telefono":"","rnc":"","fechacumpleano":"0001-05-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514649819869,"name":"Massiel","apellido":"Vidal","telefono":"8097076094","rnc":"","fechacumpleano":"0001-04-22","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651009500,"name":"Karolyn","apellido":"Aquino","telefono":"8098173908","rnc":"","fechacumpleano":"0001-03-26","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651193824,"name":"Eduardo","apellido":"Marranzini","telefono":"8095190725","rnc":"","fechacumpleano":"0001-11-28","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651293532,"name":"Philippe","apellido":"Garcia Dubus","telefono":"8092236388","rnc":"","fechacumpleano":"0001-08-27","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651340732,"name":"","apellido":"","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651414793,"name":"Ismenia","apellido":"Fernandez","telefono":"8094751251","rnc":"","fechacumpleano":"0001-06-28","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651572064,"name":"Gabriel","apellido":"Garcia","telefono":"8096042789","rnc":"","fechacumpleano":"0001-02-11","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651681781,"name":"Jennifer","apellido":"Solange","telefono":"8492201390","rnc":"","fechacumpleano":"0001-08-13","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514651890863,"name":"Hiroyuki","apellido":"Makiuchi","telefono":"8092236276","rnc":"","fechacumpleano":"0001-12-06","facebook":"","correoelectronico":"","descuento":"Carta DGII Embajador Japon","created":"2017-12-30"},{"id":1514656125488,"name":"Viriato","apellido":"Sanchez","telefono":"8496216100","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514656554262,"name":"Maria Eugenia","apellido":"de Pena","telefono":"8096977155","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514656640766,"name":"Alan","apellido":"Frias","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514656704778,"name":"Celines","apellido":"Diaz","telefono":"8492207411","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514656773610,"name":"Clara","apellido":"Jimenez","telefono":"8099350861","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514656951087,"name":"Deyanira","apellido":"Sosa","telefono":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657162707,"name":"Neflali ","apellido":"Bencosme","telefono":"8097208882","rnc":"131186998 Goat Dominicana","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657293222,"name":"Juana","apellido":"Hernandez","telefono":"8093837007","rnc":"","fechacumpleano":"0001-06-24","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657350554,"name":"Miguelina","apellido":"Pepin","telefono":"8094059938","rnc":"","fechacumpleano":"0001-12-14","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657430246,"name":"Carlos","apellido":"Mateo","telefono":"8498734483","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"Chofer ViceMinistro Obras Publicas","created":"2017-12-30"},{"id":1514657477101,"name":"Ramon ","apellido":"Reyes","telefono":"8095637276","rnc":"","fechacumpleano":"0001-05-12","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657545168,"name":"Geraldina","apellido":"Rivera","telefono":"8095497710","rnc":"","fechacumpleano":"0001-12-26","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514657908995,"name":"Pedro","apellido":"Guillermo","telefono":"8296188501","rnc":"","fechacumpleano":"0001-03-09","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514658060741,"name":"Manuel","apellido":"Mota","telefono":"8295894757","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514658102421,"name":"Mabel","apellido":"Cosmery","telefono":"8293416321","rnc":"","fechacumpleano":"0001-08-16","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514658217887,"name":"Jose Luis","apellido":"Linares","telefono":"8294404153","rnc":"","fechacumpleano":"0001-03-06","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514658410704,"name":"Roberto","apellido":"Almonte","telefono":"8299398773","rnc":"","fechacumpleano":"0001-02-10","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514658981990,"name":"Jose ","apellido":"Hernandez","telefono":"8097159223","rnc":"","fechacumpleano":"0001-01-21","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514663251300,"name":"Julio","apellido":"Figuereo","telefono":"8298604787","rnc":"","fechacumpleano":"0001-12-19","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1514663335294,"name":"Mirian ","apellido":"Luciano","telefono":"8093304298","rnc":"","fechacumpleano":"0001-05-16","facebook":"","correoelectronico":"","descuento":"0","created":"2017-12-30"},{"id":1515423038371,"name":"Gisselle","apellido":"Alvarez","telefono":"8096973916","telefono2":"","rnc":"","fechacumpleano":"0001-02-27","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515423093490,"name":"Jacqueline","apellido":"Frias","telefono":"8099106743","telefono2":"","rnc":"","fechacumpleano":"0001-12-16","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515423160927,"name":"Julian","apellido":"Negrete","telefono":"809865596","telefono2":"","rnc":"","fechacumpleano":"0001-02-22","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515423498119,"name":"Ana","apellido":"Rodriguez","telefono":"8097560861","telefono2":"","rnc":"","fechacumpleano":"0001-03-01","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515423611674,"name":"Ivelisse","apellido":"Garcia","telefono":"8496579424","telefono2":"","rnc":"","fechacumpleano":"0001-01-24","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515423718937,"name":"Andres","apellido":"Arias","telefono":"8293401671","telefono2":"","rnc":"","fechacumpleano":"0001-03-21","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515424163929,"name":"Maria","apellido":"Diaz","telefono":"8092242507","telefono2":"","rnc":"","fechacumpleano":"0001-07-23","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515424315683,"name":"Maria","apellido":"Garcia","telefono":"8097071595","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515424364937,"name":"Franklin ","apellido":"Marte","telefono":"8098798692","telefono2":"","rnc":"","fechacumpleano":"0001-12-13","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515424418391,"name":"Gisselle","apellido":"Duran","telefono":"8098486265","telefono2":"","rnc":"","fechacumpleano":"0001-02-11","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515425050144,"name":"Angel","apellido":"Moya","telefono":"8298755778","telefono2":"","rnc":"","fechacumpleano":"0001-01-02","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515425170116,"name":"Alba","apellido":"Marina","telefono":"8096190293","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515425222489,"name":"Susan","apellido":"Taveras","telefono":"8292633974","telefono2":"","rnc":"","fechacumpleano":"0001-07-17","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515426544440,"name":"Soyyusneri","apellido":"Pena","telefono":"8293472703","telefono2":"","rnc":"","fechacumpleano":"0001-07-12","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515426639366,"name":"Julissa","apellido":"Perez","telefono":"8095193311","telefono2":"","rnc":"","fechacumpleano":"0001-06-21","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515428523427,"name":"Ada","apellido":"Guzman","telefono":"8092537167","telefono2":"","rnc":"","fechacumpleano":"0001-01-03","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515439371732,"name":"Yancy","apellido":"Acosta","telefono":"8299901781","telefono2":"","rnc":"","fechacumpleano":"0001-07-16","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515439459500,"name":"Zobeida","apellido":"Escano","telefono":"8296590425","telefono2":"","rnc":"","fechacumpleano":"0001-01-02","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515439568599,"name":"Rosmery","apellido":"Suero","telefono":"8094464056","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-08"},{"id":1515517799212,"name":"Carlos Sanchez","apellido":"Sanchez de Arriba & Asoc, SRL","telefono":"8095662954","telefono2":"8096861588","rnc":"101820942","fechacumpleano":"0001-03-26","facebook":"","correoelectronico":"comediadepie@gmail.com","descuento":"0","created":"2018-01-09"},{"id":1515517905498,"name":"Andrea","apellido":"Rodriguez","telefono":"8493538565","telefono2":"","rnc":"","fechacumpleano":"0001-04-18","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515518011308,"name":"Emilio","apellido":"Peña","telefono":"8293331485","telefono2":"","rnc":"","fechacumpleano":"0001-07-14","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515518064409,"name":"Debys","apellido":"Goris","telefono":"8098899905","telefono2":"","rnc":"","fechacumpleano":"0001-10-05","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515518123829,"name":"Anibal","apellido":"Peguero","telefono":"8093641553","telefono2":"","rnc":"","fechacumpleano":"0001-04-11","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515518935159,"name":"Jhonny","apellido":"Ramos Acosta","telefono":"8097987808","telefono2":"","rnc":"","fechacumpleano":"0001-06-15","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515519056387,"name":"Gina","apellido":"Cabrera","telefono":"8492056782","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515519168190,"name":"Stephanie","apellido":"Salcedo","telefono":"8499153779","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{"id":1515523705908,"name":"Astrid ","apellido":"","telefono":"","telefono2":"","rnc":"","fechacumpleano":"","facebook":"","correoelectronico":"","descuento":"0","created":"2018-01-09"},{ "id" : 1517342160774, "name" : "Joan", "apellido" : "Prats", "telefono" : "8092585272", "telefono2" : "", "rnc" : "", "fechacumpleano" : "0001-02-04", "facebook" : "", "correoelectronico" : "", "descuento" : "0", "created" : "2018-01-30" },{ "id" : 1517342222913, "name" : "Keidy ", "apellido" : "Adames", "telefono" : "8092580872", "telefono2" : "", "rnc" : "", "fechacumpleano" : "", "facebook" : "", "correoelectronico" : "", "descuento" : "0", "created" : "2018-01-30" }, { "id" : 1517342284522, "name" : "Ruth", "apellido" : "Cueto", "telefono" : "8093909704", "telefono2" : "", "rnc" : "", "fechacumpleano" : "", "facebook" : "", "correoelectronico" : "", "descuento" : "0", "created" : "2018-01-30" },{ "id" : 1517344092705, "name" : "Nathalia", "apellido" : "Urena", "telefono" : "8294219384", "telefono2" : "", "rnc" : "", "fechacumpleano" : "0001-09-23", "facebook" : "", "correoelectronico" : "", "descuento" : "0", "created" : "2018-01-30" },{ "id" : 1517344160218, "name" : "Luz ", "apellido" : "Duluc", "telefono" : "8095416679", "telefono2" : "", "rnc" : "", "fechacumpleano" : "0001-03-28", "facebook" : "", "correoelectronico" : "", "descuento" : "0", "created" : "2018-01-30" }]


app.get('/list',function(req,res){

    var list = [];
    
    for(var x=0;x<customer.length;x++){
        
        list.push(customer[x].telefono.trim().replace(/-(?=\d)|\s/g,''));
    
    }

    res.send(list);
})

app.get('/customer',function(req,res){
    
    res.send(customer);
    
});

app.post('/customer',function(req,res){
    
    customer.push(req.body);
    //dba.addCustomer(req.body);    
    
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
{"id":"BLUSA ALT","date":"2018-02-08","name":"BLUSA ALT","item":"1","environment":"0","category":"servicio","tipo":"alteracion"},
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
{"id":"BLUSA LP","date":"2018-02-10","name":"BLUSA LP","item":"1","environment":"115","category":"servicio","tipo":"lavaryprensa"},
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

app.listen(8082);