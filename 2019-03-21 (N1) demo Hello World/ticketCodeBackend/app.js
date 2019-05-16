var express = require('express');
var firebase = require('firebase-admin');
var bodyParser = require('body-parser');

var application = express();
// app.use(bodyParser.json());

var config = {
  apiKey: "AIzaSyBjE90yYLqB9sQWaeB7kdq4a5p-rEFflkk",
  authDomain: "ticketcode-a340c.firebaseapp.com",
  databaseURL: "https://ticketcode-a340c.firebaseio.com",
  projectId: "ticketcode-a340c",
  storageBucket: "ticketcode-a340c.appspot.com",
  messagingSenderId: "976816143413"
};
firebase.initializeApp(config);



const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {  
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Server Running!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');  
console.log('Node server running on port 3000');


//GET
application.get('/', function (req, res) {
	console.log("HTTP GET Request");
	var userReference = firebase.database().ref("/Users/");

	userReference.on("value", 
    function(snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
      }, 
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    });
});

//PUT
application.put('/', function (req, res) {''
	console.log("HTTP PUT Request");

	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.set({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be saved." + error);
					} 
					else {
						res.send("Data saved successfully.");
					}
			});
});

//POST
application.post('/', function (req, res) {
	console.log("HTTP POST Request");

	var userName = req.body.UserName;
	var name = req.body.Name;
	var age = req.body.Age;

	var referencePath = '/Users/'+userName+'/';
	var userReference = firebase.database().ref(referencePath);
	userReference.update({Name: name, Age: age}, 
				 function(error) {
					if (error) {
						res.send("Data could not be updated." + error);
					} 
					else {
						res.send("Data updated successfully.");
					}
			    });
});

//DELETE
application.delete('/', function (req, res) {
	 console.log("HTTP DELETE Request");
	 
	 var name= req.body.scoutName,
	 password=req.body.scoutPassword;


			 db.collection('scoutPost').remove(
					 { 'name': name,'password':password},
					 function (err, r) {
							 assert.equal(null, err);
							 res.send("Document deleted");
					 });
});