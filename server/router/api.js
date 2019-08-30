const express = require("express");
const router = express.Router();
const app = express();
var Category =require("../models/Categories.js");
var path = require("path");
var Product =require("../models/Product.js");
var Customer =require("../models/Customer.js");
var Cart =require("../models/Cart.js");
const bcrypt = require("bcryptjs")
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../router/middlware/auth.js");



app.use(express.json());

//define the category list page route
router.get("/categories",function(req,res) {

	  Category.find({},(err,category) => {

	  	if(err) console.log("Category Listing error: ",err);
	  	 res.send(category);

	  });	 


});

router.get("/products/:category?",function(req,res) {

		if(req.params.category) {

				  Product.find({product_category: req.params.category},(err,product) => {

				  	if(err) console.log("product Listing error: ",err);
				  	 res.send(product);

				  });	
		}else{

				  Product.find({},(err,product) => {

					  	if(err) console.log("product Listing error: ",err);
					  	 res.send(product);

					  });	
		}
 
});

router.get("/product/:id",function(req,res) {

	  Product.findById(req.params.id,(err,product) => {

	  	if(err) console.log("product Listing error: ",err);
	  	 res.send(product);

	  });	 
});

router.get("/product/sellingbest/:id",function(req,res) {


  Product.findById(req.params.id,(err,product) => {

	  	if(err) console.log("product Listing error: ",err);
	  	 res.send(product);

	  });	 

});

/* Customer Routes */

router.post("/user/register",function(req,res){
	const { name , email ,password } = req.body;
	
	//Simple validation
	if(!name || !email || !password) {
		return res.status(400).json({
			msg : "please fill all fields"
		})
	}else{


	// check for exisiting user
	Customer.findOne({email})
			.then( user => {
				if(user) {
					return res.status(400).json({
						msg : "User already exists"
					})
				}else{

					const newUser = new Customer({
						name,
						email,
						password
					});

					//Create salt & hash
					bcrypt.genSalt(10,(err,salt) => {

						bcrypt.hash(newUser.password,salt,(err ,hash) => {
							if(err) throw err;
							newUser.password = hash;
							newUser.save()
								.then(user => {
									jwt.sign({id : user.id },config.get('jwtSecret'),{expiresIn : 3600} , 
										(err,token) => {
											if(err) throw err;

											res.json({
											token,
											user : {
											id : user._id,
											name :user.name,
											email : user.email

										}
										})
										}
										);


									
								})
						})
					})
				}
			})
			

	}



});



// User Authentication


router.post("/user/auth",function(req,res){
	const { email ,password } = req.body;
	
	//Simple validation
	if( !email || !password) {
		return res.status(400).json({
			msg : "please fill all fields"
		})
	}else{


	// check for exisiting user
	Customer.findOne({email})
			.then( user => {
				if(!user) {
					return res.status(400).json({
						msg : "User does not exist"
					})
				}else{


					//validate password
					//console.log(password[0]);
					bcrypt.compare(password[0],user.password)
						.then(isMatch => {
							if(!isMatch) {
								return res.status(400).json({ msg : "Invalid credentials"});

							}else{

								jwt.sign({id : user.id },config.get('jwtSecret'),{expiresIn : 216000} , 
										(err,token) => {
											if(err) throw err;

											res.json({
											token,
											user : {
											id : user._id,
											name :user.name,
											email : user.email

										}
										})
										}
										);
							}
						}).catch(err => {
							console.log(err);
						})
				}
			})
			

	}



});


//geting user token
router.get("/user/auth/data",auth,(req,res) => {

Customer.findById(req.user.id)	
		.select('-password')
		.then(user => {
			res.json(user);
		});

});


module.exports = router;
