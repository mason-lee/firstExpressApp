var shoppingListData = [];

$(function() {
	var name,
		amount = 0,
		total = 0;
	
	$(function init() {
        $(".shopping-container").droppable({
        	drop: function(event, ui) {
        		// Snap dropped element
        		$(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
        	},
        	revert: "valid", 
        	revertDuration:200
        }); 


        // jQuery Ajax call for JSON
        $.getJSON('/index/shoppinglist', function(data) {

        	// for each item in our JSON, add a list item
        	$.each(data, function() {
        		console.log("retrieving shopping list....");
        		console.log(this.item, this.amount, this.type);
        			
        		// Create list item
        		createListElement(this.type);
        	});
        });
    });

	//Get the value from the inputs	
	function getValues() {
		name = $("input[name='product_name']").val();
		amount = $("input[name='amount']").val();
		return {
			purchased_item: function() {
				return name;
			},
			product_amount: function() {
				return amount;
			}
		};
	}	

	// Create list element
	function createListElement(category) {
		var parent,
			item_list,
			parent;
			
		parent = $("." + category);

		name = getValues().purchased_item();
		amount = getValues().product_amount();
		
		var newList = {
			'item': name,
			'amount': amount,
			'category': category
		};

		// console.log(newList);


		// Input validation 
		if(!name && !amount) {
			$("<span></span>", {
				"text": "Please add name and amount of the product."
			}).appendTo("form").fadeIn(9000).fadeOut(3000, function() {
				$(this).remove();
			});
			return;
		}

		if(!$.isNumeric(amount) || !amount) {
			$("<span></span>", {
				"text": "Please add amount."
			}).appendTo("form").fadeIn(2000).fadeOut(2000, function() {
				$(this).remove();
			});
			return;
		}

		if(!name) {
			$("<span></span>", {
				"text": "Please add name of the product."
			}).appendTo("form").fadeIn(2000).fadeOut(2000, function() {
				$(this).remove();
			});
			return;
		}


		var itemWrapper = function() {
			// A list of product name and amount
			itemList = $("<div/>", {
				"class": "item-list clearfix"
			}).appendTo(parent);

			// Name of the product 
			$("<div/>", {
				"class": "item-name col-md-7 pull-left",
				"text": name
			}).appendTo(itemList);

			// Name of the price
			$("<div/>", {
				"class": "item-price col-md-3 pull-left",
				"text": "$" + amount.toString()
			}).appendTo(itemList);

			// Remove button
			$("<div/>", {
				"class": "remove-item pull-right",
				"text": "remove",
				click: function() {
					// amount to be removed
					var price_value = $(this).siblings(".item-price").html();
					var price = parseFloat(price_value.replace("$", ""));
					total = total - price * 1.10;
					$(".price-summary").html("Total: $" + total.toFixed(2));
					// remove this item list
					$(this).parent().remove();
				}
			}).appendTo(itemList);
		};
		

		$.ajax({
			type:'POST',
			data: newList,
			url: '/index/addlist',
			dataType: 'JSON'
		}).done(function(response) {

			if(response.msg === '') {

				// Reset a form
				name = $("input[name='product_name']").val("");
				amount = $("input[name='amount']").val("");

				// Update the list

			} 
			else {
				// If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
			}
		});


		// Append total value to the price summary area
		total = total + parseFloat(amount) * 1.10;
		$(".price-summary").html("Total: $" + total.toFixed(2));

		// Draggable
		itemList.draggable({ revert: "invalid", revertDuration: 200 });
	}

	$(".action-form").submit(function(e) {
		e.preventDefault();
		// Get the selected product category
		var category = $("select[name='item-type'] :selected").val();

		// Create list
		createListElement(category);

		
	});

    // // add list
    // function addList(e) {
    // 	e.preventDefault();


    // }

	$(".remove").click(function() {
		$(".item-list").remove();
		total = 0;
		$(".price-summary").html("Total: $" + total.toFixed(2));
	});	







});