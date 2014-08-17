var mongoose = require('mongoose');
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
var model = mongoose.model('ShoppingList', ShoppingListSchema);

// Add a function to the model class to create a default shopping list
model.createEmptyList = function(completeCallback) {
  return model.create({
    departments: [
      {name: 'Produce', items: [{name: 'Banana', amount: 12}]},
      {name: 'Grocery', items: []},
      {name: 'Dairy/Frozen Foods', items: []},
      {name: 'Meats/Deli Items', items: []},
      {name: 'Other', items: []},
    ]
  }, completeCallback);
}

module.exports = model
