// BASE SETUP
// ===================================================
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://brent:masoncodecore@proximus.modulusmongo.net:27017/o5howapA');

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 8080;

// Set up the base path '/' that just renders the index view
var router = express.Router();
router.get('/', function(req, res) { res.render('index'); });
app.use('/', router);

// Set up the api routes all under the '/api' namespace
var shoppingApi = require('./app/routes/api');
app.use('/api/shopping-list', shoppingApi);

app.listen(port);
console.log('Magic happens on port ' + port);
