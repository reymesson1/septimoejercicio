var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static('static'))
var moment = require('moment');
app.use(bodyParser.json());
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
var userController = require('./controller/userController');

/*********
*   Master Controller
*
**********/

app.get('/masterAPI', masterController.MasterAPI)

app.get('/master', masterController.getMaster)

app.post('/master', masterController.setMaster);

app.post('/deletemaster', masterController.removeMaster);

app.get('/reporte', masterController.reportMaster)

app.post('/updatedelivery', masterController.updateDeliveryMaster)

app.post('/loader', masterController.masterLoader);

app.post('/payment', masterController.paymentMaster)

app.get('/main', masterController.maingetMaster)

app.post('/main', masterController.mainsetMaster)

app.post('/quotation', masterController.masterQuotation)

app.post('/done', function(req,res){

    var id = req.body.id;

    var index = master.findIndex(x=> x.id==id);

    master[index].status='done'

    res.send('exchanged');
})

app.get('/mastercsv', masterController.getMasterCSV)
app.get('/masteritemreport', masterController.getMasterItemReport)
app.get('/dashboardmaster', masterController.getDashboardMaster)


/*********
*   Detail Controller
*
**********/

app.get('/detail', detailController.getDetail);

app.get('/detailcsv', detailController.getDetailCSV);

app.post('/detail', detailController.setDetail);

app.post('/deletedetail', detailController.removeDetail);

app.post('/updatedetail', detailController.updateDetail);


/*********
*   Customer Controller
*
**********/

app.get('/customer', customerController.getCustomer);

app.get('/customercsv', customerController.getCustomerCSV);

app.post('/customer', customerController.setCustomer)

app.post('/deletecustomer', customerController.removeCustomer);

app.post('/updatecustomer', customerController.setCustomerUpdate)

app.get('/list', customerController.getCustomerList)

/*********
*   User Controller
*
**********/

app.get('/logout', userController.getLogout);

app.post('/register', userController.setRegister);
  
app.post('/login', userController.setLogin);

app.post('/resetpassword', userController.setResetPassword);

mongoose.connect('mongodb://localhost:27017/eltendedero',(err)=>{
    if(!err){
        console.log('Connected to mongo Database');
    }
})

app.listen(8082);