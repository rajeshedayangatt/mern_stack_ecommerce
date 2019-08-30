$(document).ready(function() {
$("#product_form").validate();
$("#category_form").validate();
$("#sub_category_form").validate();


	//initial setup
	$("#subcategory_div").hide();
	var base_url = window.location.origin;

	// Product List Page functions

	//product added successfully checking
	var status = getUrlParameter('status');
	var type = getUrlParameter('type');
	if(type == "category" ){

			if(status == "success") {

				swal("Success!", "Category Added Successfully!", "success");

			}
	}
	else if(type == "product"){
				if(status == "success") {

				swal("Success!", "Product Added Successfully!", "success");

			}	
	}


	$(document).on("click",".delete_product",function() {


		var product_id = $(this).data("id");
	

		swal({
		  title: "Are you sure?",
		  text: "But you will still be able to retrieve this file.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, archive it!",
		  cancelButtonText: "No, cancel please!",
		  closeOnConfirm: false,
		  closeOnCancel: false
        })
        .then((willDelete) => {
          if (willDelete) {


				    		//delete product
							$.ajax({
								type : "GET",
								url : base_url+"/admin/product/delete/"+product_id,
								dataType : "json"

							}).then(function(data) {
								if(data.message == "success") {
									swal("Success!", "Product Deleted Successfully!", "success");

									location.reload();
								}

							}).catch(function(err)  {
								console.log(err);
								swal("Failed to delete product!");
							});    
          } else {
            swal("Your product is safe!");
          }
        });


	});

	//delete category 

	$(document).on("click",".delete_category",function() {


		var category_id = $(this).data("id");
	

		swal({
		  title: "Are you sure?",
		  text: "But you will still be able to retrieve this file.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, archive it!",
		  cancelButtonText: "No, cancel please!",
		  closeOnConfirm: false,
		  closeOnCancel: false
        })
        .then((willDelete) => {
          if (willDelete) {


				    		//delete product
							$.ajax({
								type : "GET",
								url : base_url+"/admin/category/delete/"+category_id,
								dataType : "json"

							}).then(function(data) {
								if(data.message == "success") {
									swal("Success!", "Category Deleted Successfully!", "success");

										location.reload();
								}

							}).catch(function(err)  {
								console.log(err);
								swal("Failed to delete product!");
							});    
          } else {
            swal("Your product is safe!");
          }
        });


	});

	$(document).on("click",".delete_sub_category",function() {


		var category_id = $(this).data("id");
		var sub_category_id = $(this).data("sub-id");

	

		swal({
		  title: "Are you sure?",
		  text: "But you will still be able to retrieve this file.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes, archive it!",
		  cancelButtonText: "No, cancel please!",
		  closeOnConfirm: false,
		  closeOnCancel: false
        })
        .then((willDelete) => {
          if (willDelete) {


				    		//delete product
							$.ajax({
								type : "GET",
								url : base_url+"/admin/subcategory/delete/"+category_id+"/"+sub_category_id,
								dataType : "json"

							}).then(function(data) {
								if(data.message == "success") {
									swal("Success!", "Sub Category Deleted Successfully!", "success");

										location.reload();
								}

							}).catch(function(err)  {
								console.log(err);
								swal("Failed to delete product!");
							});    
          } else {
            swal("Your product is safe!");
          }
        });


	});
	//image added 


	// Product Edit Page functions

	$(document).on("click",".delete",function() {


		var product_id = $(this).data("id");

		$("#image_status").val(1);

		$(".image_div").html("<label for='image'>Image</label><input type='file' name='product_image' class='form-control'/>");

	});


	//sub categories show
	$(document).on("change","#category",function() {

		var categoryID = $(this).val();

		$.ajax({
			type : "GET",
			url  : base_url+"/admin/product/subcategories/"+categoryID,
			dataType : "json"

		}).then(function(data) {
			if(data.message == "success") {
				console.log(data.subcategories);
				var selectOption = "<option value='' > Select SubCategories</option>";
				if(data.subcategories.length > 0) {
					$.each(data.subcategories,function(index,val) {

						selectOption += "<option value='"+data.subcategories[index].sub_category_id+"'>"+data.subcategories[index].sub_category_name+"</option>";

					});
					

				}else{

					selectOption += "<option value=''>No SubCategories</option>";
				}
				$("#subcategory").html(selectOption);
				$("#subcategory_div").show(1000);	
							
			}

		}).catch(function(err)  {

			console.log(err);
								
		});    

		$("#subcategory_div").show(1000);

	});

});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};





