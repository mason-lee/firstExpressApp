// BASE SETUP
// ===================================================
var express = require('express');
var path = require('path');
var cors = require('express-cors');

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://brent:masoncodecore@proximus.modulusmongo.net:27017/o5howapA');

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use("/stylesheets", express.static(__dirname + "/stylesheets"));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 8080;

// Set up the base path '/' that just renders the index view
var router = express.Router();
// Will handle any request that ends in /.
// depends on where the router is "use()'d"
router.get('/', function(req, res) { res.render('index'); });
app.use('/', router);

// Set up the api routes all under the '/api' namespace
// Mason: It's same if you copy and paste code in api.js

// var shoppingApi = require('./app/routes/api');
// app.use('/api/shopping-list', shoppingApi);

// var ShoppingList = require('././app/models/shopping_list');


var Schema = mongoose.Schema;

// A shopping list is just a collection of named Departments
// with items (productNames and Amounts) inside
var ShoppingListSchema = new Schema({
  departments: [{
    name: String,
    items: [{
      name: String,
      amount: Number
    }]
  }]
});

// Define the model using the above schema
// All document creation and retreival from the database is handled by these models.
var model = mongoose.model('ShoppingList', ShoppingListSchema);

// Add a function to the model class to create a default shopping list
model.createEmptyList = function(completeCallback) {
  return model.create({
    departments: [
      {name: 'Produce', items: [{name: 'Banana', amount: 12}]},
      {name: 'Grocery', items: []},
      {name: 'Dairy/Frozen Foods', items: [{name: 'Yogurt', amount: 5.99}]},
      {name: 'Meats/Deli Items', items: []},
      {name: 'Other', items: []},
    ]
  }, completeCallback);
}

router.post('/api/shopping-list', function(req, res) {
	// model.find().exec(function(err, shoppingList) {
	// 	shoppingList.update(req.body, function(err, _, _) {
	// 		if(err === null) {
	// 		res.json({success: true});
	// 			console.log(req.body)
	// 		}
	// 		else {
	// 			res.json({error: err});
	// 		}
	// 	});
	// });	
	model.update(req.body, function(err, shoppingList) {
		if(err === null) {
			res.json({success: true});
			console.log(req.body)
		}
		else {
			res.json({error: err});
		}
	});
});

router.get('/api/shopping-list', function(req, res) {
	model.find().exec(function(err, value) {
		var renderResponse = function(list) {
			res.json(list);
		};

		if(value.length==0) {
			model.createEmptyList(function(err, newList) {
				renderResponse(newList);
			});
		}
		else {
			renderResponse(value);
		}
	});
});	

app.listen(port);
console.log('Magic happens on port ' + port);
