module.exports = function(){ 

        var moment = require('moment');

        var today = moment(new Date()).format('YYYY-MM-DD');


	function getUsers(user,callback){ 

		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/mechy";
		MongoClient.connect(url, function(err, db) {
	            if (err) throw err;        
	              db.collection("users").find(user).toArray(function(err,result){            
        	          callback(result);   
	        })        
	        db.close();
          	});

	}

	

	function getMaster(master,callback){ 

		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/mechy";
		MongoClient.connect(url, function(err, db) {
	            if (err) throw err;        
	              db.collection("master").find({"date":today}).toArray(function(err,result){            
        	          callback(result);   
	        })        
	        db.close();
          	});

	}

	function getDetail(detail,callback){

                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/mechy";
                MongoClient.connect(url, function(err, db) {
                    if (err) throw err;
                      db.collection("detail").find({}).toArray(function(err,result){
                          callback(result);
                })
                db.close();
                });

        }

	function addMaster(master){

		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/mechy";

		MongoClient.connect(url, function(err, db) {

			if (err) throw err;
			db.collection("master").insertOne(master, function(err, res) {
			
				if (err) throw err;
				console.log("1 record inserted");
				db.close();
	
			});

		});

	}
	
	function addDetail(detail){

                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/mechy";

                MongoClient.connect(url, function(err, db) {

                        if (err) throw err;
                        db.collection("detail").insertOne(detail, function(err, res) {

                                if (err) throw err;
                                console.log("1 record inserted");
                                db.close();

                        });

                });

        }

	function removeDetail(detail){

                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/mechy";

                MongoClient.connect(url, function(err, db) {

                        if (err) throw err;
                        db.collection("detail").remove(detail, function(err, res) {

                                if (err) throw err;
                                console.log("1 record removed");
                                db.close();

                        });

                });

        }


	return{
		
		getUsers: getUsers,
		addMaster: addMaster,
		getMaster: getMaster,
		addDetail: addDetail,
		getDetail: getDetail,
		removeDetail: removeDetail
	}

}
