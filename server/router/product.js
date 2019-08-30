const express = require("express");
const router = express.Router();
const app = express();
var multer  = require('multer');
var Product =require("../models/Product.js");
var path = require("path");
var Category =require("../models/Categories.js");

//File uploading config
var file_name = "";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/uploads/product/')
  },
  filename: function (req, file, cb) {
  	file_name = req.body.product_name + '-' + Date.now() + path.extname(file.originalname);
    cb(null, file_name)
  }
});
var upload = multer({ storage: storage });



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
// router.use(bodyParser.urlencoded({ extended: true }));

//define the product list page route
router.get("/",function(req,res) {
	  //get all products
	  Product.find({},(err,product) => {

	  	if(err) console.log("product Listing error: ",err);
	  		var image_url = req.protocol + '://' + req.get('host') + "/static/product/";
	  	 res.render('index',{products : product,image_url,status:12});

	  });
	 
});

//define the product add page route
router.get("/add",function(req,res) {

	Category.find({},(err,category) => {
		if(err) console.log(err);
		res.render('add',{categories:category});
	});
	
});



//define the productsave page
router.post("/save", upload.single('product_image'),function(req,res) {

	  var product = new Product({
	    	product_name : req.body.product_name,
			product_actual_price : req.body.product_actual_price,
			product_selling_price:req.body.product_selling_price,
			product_image:file_name,
			product_description: req.body.product_description,
			product_category : req.body.category, 
			product_sub_category : req.body.subcategory,
	  });

	  product.save().then(product => {
	  //	res.json(product);
	  	res.redirect("/admin/product?status=success");
	  }).catch(err => {
	  	console.log(err);
	  });

});


//define the product edit page route
router.get("/edit/:id",function(req,res) {

	var image_url = req.protocol + '://' + req.get('host') + "/static/product/";
	Product.findById(req.params.id,(err,product) => {

		if(err) console.log("product edit page error",err);

		Category.find({},(err,category) => {

			res.render('edit',{product: product,image_url :image_url,categories:category});

		});

	});
});



//define the productsave page
router.post("/update/:id", upload.single('product_image'),function(req,res) {


	Product.findById(req.params.id,(err,product) => {

		if(err) console.log("product edit page error",err);

		//update table
		product.product_name = req.body.product_name;
		product.product_actual_price = req.body.product_actual_price;
		product.product_selling_price=req.body.product_selling_price;
		if(req.body.image_status == "1") {
			product.product_image =file_name;
		}
		product.product_description = req.body.product_description;
		product.product_category = req.body.category;
		product.product_sub_category =req.body.subcategory;
		product.save().then(product => {
	  	res.redirect("/admin/product");
	    }).catch(err => {
	   	console.log(err);
	   });
	});

});

//define product delete
router.get("/delete/:id",(req,res) => {

Product.findByIdAndRemove(req.params.id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "success",
        id: todo._id
    };
    return res.status(200).send(response);
});

});


//define sub catgories getting
router.get("/subcategories/:id",(req,res) => {
	var response = {
			message : "",
			subcategories : {}
		}
	Category.findById(req.params.id,(err,category) => {

		if(err) console.log(err);
		if(category.category_sub_items.length > 0) {
					 response = {
			message : "success",
			subcategories : category.category_sub_items
		}
	}

		return res.status(200).send(response);

	});

});
module.exports = router;
