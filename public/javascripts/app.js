var name, amount = 0, total = 0;

window.renderShoppingList = function() {
  // empty out wrapper

  // For each item in our JSON, add a list item
  // $.each(window.shoppingList.departments, function(department) {
    // Re-draw each of the lists with the new data
    // create a column, set the name to the department name
    // $.each(department.items, function(item)) {
    //   create a li with item name and amount, append to the department column
    // }

    // var $parent = $("." + department);
    // console.log("department.name");

    // console.log(department);
  // });
}

window.renderDepartmentOptions = function() {
  // var $departmentSelector = $('.department-select-thing');
  // $departmentSelector.empty()
  // $.each(window.shoppingList.departments, function(department) {
  //   var $option = $('<option value="' + department.name + '">' + department.name + '</option>')
  //   $departmentSelector.append($option);
  // });
};

window.addToShoppingList = function(category, name, amount) {
  // Add the item to window.shoppingList
  // Submit post request
  
}

// jQuery Ajax call for JSON
$.getJSON(ApiEndpoints.index, function(shoppingList) {
  window.shoppingList = shoppingList;
  renderDepartmentOptions();
  renderShoppingList();
});

$(function() {
  $(".shopping-container").droppable({
    drop: function(event, ui) {
      // Snap dropped element
      $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
    },
    revert: "valid",
    revertDuration:200
  });

  // Add item to category
  $(".action-form").submit(function(e) {
    e.preventDefault();

    // Get the selected product category
    var category = $("select[name='item-type'] option:selected").val();

    // Create list
    createListElement(category);
  });

  // Clear all items from the list
  $(".remove").click(function() {
    $(".item-list").remove();
    total = 0;
    $(".price-summary").html("Total: $" + total.toFixed(2));
  });
});
