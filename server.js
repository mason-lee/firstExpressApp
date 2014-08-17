// BASE SETUP
// ===================================================
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongo = require('mongoskin');
// var db = mongoose.connection;
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var db = mongo.db("mongodb://localhost:27017/shoppingManager", {native_parser:true});
// make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

var Bear = require('./app/models/bear');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// set the port
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// ===================================================

// get an instance of Express router

// var router = express.Router();
var routes = require('./routes/index');
// var routes = require('./routes/userlist');

// middleware to use for all requests
routes.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here.
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
routes.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});

// REGISTER OUR ROUTES 
// ===================================================
app.use('/index', routes);

// START THE SERVER
// ===================================================
app.listen(port);
console.log('Magic happens on port ' + port);









