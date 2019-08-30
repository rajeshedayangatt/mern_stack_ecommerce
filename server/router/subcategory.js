const express = require("express");
const router = express.Router();
const app = express();
var Category =require("../models/Categories.js");
var path = require("path");
var Product =require("../models/Product.js");
var uuid = require("uuid");
var mongoose = require("mongoose");

var ObjectId = mongoose.ObjectId;
// //middleware that is specific to this router
// router.use(function timeLog(req,res,next) {
// 	console.log('Time: ',Date.now());
// 	next();
// });

//set up view file
app.set('view engine', 'pug');
app.set('views', './server/views');
//middleware that is specific to this router
router.use(function timeLog(req,res,next) {
	 if (req.user) {
        next();
    } else {
        res.redirect('/admin/auth/login');
    }
});



//define the category list page route
router.get("/",function(req,res) {
	  Category.find({},(err,category) => {

	  	if(err) console.log("Category Listing error: ",err);
	  	 res.render('subcategory/index',{subcategories : category});

	  });	 
});


//define the category list page route
router.get("/add",function(req,res) {

	  Category.find({},(err,category) => {

	  	if(err) console.log("Category Listing error: ",err);
	  	 res.render('subcategory/add',{categories : category});

	  });	 
	 
});


//define the productsave page
router.post("/save",function(req,res) {

	  var category_id = req.body.category;

	  Category.findById(category_id,(err,category) => {

		  	if(err) console.log("Category save error: ",err);

		  	category.category_sub_items.push({
		  		sub_category_id : uuid.v4(),
		  		sub_category_name :req.body.sub_category_name 
		  	}) ;

		  	category.save().then((category) => {

	  			res.redirect("/admin/subcategory");

		  	}).catch((err) => {
		  		console.log("Update Error Category",err);
		  	});
	  });

});


//define the category list page route
router.get("/edit/:categoryid/:subcategoryid",function(req,res) {

		  Category.findById(req.params.categoryid ,(err,category) => {

		  	if(err) console.log("Category Edit error: ",err);
		  	console.log(category);
		  	let subcategory_id = "";
		  	let subcategory_name = "";
		  	let category_id = category._id;
			for(var val of category.category_sub_items) {
			   		subcategory_id = val.sub_category_id;
		  			subcategory_name = val.sub_category_name;
			}

			  Category.find({},(err,category) => {

			  	if(err) console.log("Category Listing error: ",err);
			  	 res.render('subcategory/edit',{categories : category,subcategory_id,subcategory_name,category_id});

			  });	 
		  	
		  });	
	 
});


//define the category update
router.post("/update",function(req,res) {

		let previous_category = req.body.previous_category;
		let previous_sub_category = req.body.previous_sub_category;
		let subcategory_name_added = req.body.sub_category_name;
		let category_id_selected = req.body.category;


		if(previous_category !== category_id_selected) {

			//if category changed

			  Category.findById(category_id_selected,(err,category) => {

				  	if(err) console.log("Category save error: ",err);
				  	

				  	category.category_sub_items.push({
				  		sub_category_id : uuid.v4(),
				  		sub_category_name :subcategory_name_added
				  	}) ;

				  	category.save().then((category) => {

			  			res.redirect("/admin/subcategory");

				  	}).catch((err) => {
				  		console.log("Update Error Category",err);
				  	});
			  });


		}else{

			//update previous category

		

			Category.updateOne( 
		      { _id :  previous_category },
		      { $pull: { category_sub_items : { sub_category_id : previous_sub_category } } },
		      { safe: true },
		      function removeConnectionsCB(err, obj) {
		          
		      	if(err)  console.log(err);

		        Category.findById(category_id_selected,(err,category) => {

				  	if(err) console.log("Category save error: ",err);
				  	

				  	category.category_sub_items.push({
				  		sub_category_id : uuid.v4(),
				  		sub_category_name :subcategory_name_added
				  	}) ;

				  	category.save().then((category) => {

			  			res.redirect("/admin/subcategory");

				  	}).catch((err) => {
				  		console.log("Update Error Category",err);
				  	});
			  });


		      });

			 

		}





});


//define category delete
router.get("/delete/:categoryid/:subcategoryid",(req,res) => {

			Category.updateOne( 
		      { _id :  req.params.categoryid },
		      { $pull: { category_sub_items : { sub_category_id : req.params.subcategoryid } } },
		      { safe: true },
		      function removeConnectionsCB(err, obj) {
		          
		      	if(err)  console.log(err);

		     	 const response = {
			        message: "success",
			        id: obj._id
			    };
			    return res.status(200).send(response);

		      });

});




module.exports = router;
