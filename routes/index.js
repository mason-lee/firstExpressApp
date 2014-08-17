var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
  // console.log("hello");
});

router.get('/shoppinglist', function(req, res) {
	var db = req.db;
	db.collection('shoppinglist').find().toArray(function(err, items) {
		res.json(items);
	});
});

/*
	POST to addList
*/
router.post('/addlist', function(req, res) {
	var db = req.db;
	db.collection('shoppinglist').insert(req.body, function(err, result) {
		res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
});



module.exports = router;
