// var ShoppingList = require('./../models/shopping_list');
// var express = require('express');
// var router = express.Router();

// router.get('/', function(req, res) {
//   ShoppingList.find().exec(function(err, value) {
//     var renderResponse = function(list) { res.json(list); }

//     if (value.length == 0) {
//       ShoppingList.createEmptyList(function(err, newList) {
//         renderResponse(newList);
//       });
//     } else {
//       renderResponse(value);
//     }
//   });
// });

// router.post('/', function(req, res) {
//   ShoppingList.find().exec(function(err, shoppingList) {
//     shoppingList.update(req.body, function(err, _, _) {
//       if (err === null) {
//         res.json({success: true})
//       } else {
//         res.json({error: err})
//       }
//     });
//   });
// });

// module.exports = router;
