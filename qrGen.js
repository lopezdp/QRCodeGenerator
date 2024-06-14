/****************************************************************************************************************
* 
* QR Code Generator Tool
* Author: David P. Lopez
* Company: YourMOM, Inc.
* Copyright 4343
* 
* Built this using open source frameworks while working at a place full of bozos.
* You'd be surprised, the people who oversee the orgs you work for are truly incompetent.
****************************************************************************************************************/

// Declare port variables
var nodePort = 8080; // port to allow nodejs to serve http event requests  --> Not Used Yet 5/16/2018
var clientPort = 4000; // port to allow Expressjs to make AJAX calls from Client-Side

// Declare variable to access Express.js module from npm
var express = require("express"); // Instantiate express object in nodejs
var path = require("path");

// Declare & define bodyParser package with multer for use with POST requests
var bodyParser = require("body-parser");

var multer = require("multer");
var upload = multer();

// Declare variables required to acced qrcode
var QRCode = require('qrcode')

// Declare & instantiate Express App
var app = express();

// app.use(bodyParser.urlencoded({extended: true})); //support for encoded bodies
app.use(bodyParser.json({type: "application/json"})); // support for json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Define the port to run Express App
app.set('port',clientPort);

// This allows access to a public folder to serve up static files for MVC
app.use("/qr", express.static(path.join(__dirname, "public")));

app.listen(clientPort); 

/****************************************************************************************************************
* Root Directory
* 
****************************************************************************************************************/

app.get("/", function(req,res){
	// Server will send home page to front end
	res.sendFile("qrGenerator.html", { root: __dirname });
});

/****************************************************************************************************************
* QR Code Generator
* 
*
* 
* 
****************************************************************************************************************/
app.post("/qrCode", upload.array(), function(req, res, next){
	/*
	var dataToEncode = qr.image(req.body['dataToEncode'], {type: 'png'});
	res.setHeader('Content-type', 'image/png');
	dataToEncode.pipe(res);
	*/


	var dataToEncode = req.body['dataToEncode'];
	QRCode.toString(dataToEncode, function(err, str){
		console.log(str);
		console.log(err);



		res.send((str));
	});
	

});
