const express = require("express");
const router = express.Router();
const app = express();
var Category =require("../models/Categories.js");
var path = require("path");
var Product =require("../models/Product.js");




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
	  	 res.render('category/index',{categories : category});

	  });	 
});


//define the category list page route
router.get("/add",function(req,res) {

	  	 res.render('category/add');

	 
});


//define the productsave page
router.post("/save",function(req,res) {
	  var category = new Category({
	    	category_name : req.body.category_name
	  });

	  category.save().then(product => {
	  //	res.json(product);
	  	res.redirect("/admin/category?type=category&status=success");
	  }).catch(err => {
	  	console.log(err);
	  });

});


//define the category list page route
router.get("/edit/:id",function(req,res) {

		  Category.findById(req.params.id,(err,category) => {

		  	if(err) console.log("Category Edit error: ",err);
		  	 res.render('category/edit',{category : category});

		  });	
	 
});


//define the category update
router.post("/update/:id",function(req,res) {
	  var category = new Category({
	    	category_name : req.body.category_name
	  });

	  Category.findById(req.params.id,(err,category) => {

		  	if(err) console.log("Category update error: ",err);

		  	category.category_name = req.body.category_name;

		  	category.save().then((category) => {

	  		res.redirect("/admin/category");

		  	}).catch((err) => {
		  		console.log("Update Error Category",err);
		  	});
	  });



});


//define category delete
router.get("/delete/:id",(req,res) => {

Category.findByIdAndRemove(req.params.id, (err, category) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "success",
        id: category._id
    };
    return res.status(200).send(response);
});

});
module.exports = router;
