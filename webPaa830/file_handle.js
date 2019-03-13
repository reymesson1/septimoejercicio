var request = require("request");
var moment = require("moment");

var today = moment(new Date()).format("YYYY-MM-DD");

const fs = require("fs");

var csv;

request.get("http://localhost:8082/customer",function(error,response,body){

		if(!error&&response.statusCode == 200){

			console.log(today);
			var jsonObj  = JSON.parse(body);
			var jsonContent = JSON.stringify(jsonObj);
			fs.writeFile("/root/bkdir/output_"+today+".json",jsonContent,'utf8',function(err){

		if(err){
			console.log("An error ocurred while writing JSON Object to file.");
			return console.log(err);
		}
			console.log("JSONfike has been saved");

})
		}

	
})


