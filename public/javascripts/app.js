var name, amount = 0, total = 0;

window.renderShoppingList = function() {
  // For each item in our JSON, add a list item
  $.each(window.shoppingList.departments, function(department) {
    // Re-draw each of the lists with the new data
  });
}

window.renderDepartmentOptions = function() {
  // Remove all <option> within the department select
  $.each(window.shoppingList.departments, function(department) {
    // Add an option for each department.name
  });
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
    var category = $("select[name='item-type'] :selected").val();

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
