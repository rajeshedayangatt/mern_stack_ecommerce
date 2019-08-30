var express = require("express");
var router = express.Router();
var Cart = require("../models/Cart");
var auth = require("../router/middlware/auth.js");

router.post('/cart/quantity/update',auth, (req, res) => {

	if(req.body.type =="increase") { 

 Cart.updateOne({ user:  req.user.id, 'cart._id': req.body.cart_id},
    { $inc: { 'cart.$.quantity': 1 } }, function (err, response) {
      if (err) { return console.error(err) }
      Cart.findOne({ user:  req.user.id }, function (err, doc) {
        if (err) { return console.error(err) }
        	console.log(doc)
        res.send(doc)
      })
    });

	}else{


 Cart.updateOne({ user:  req.user.id, 'cart._id': req.body.cart_id},
    { $inc: { 'cart.$.quantity': -1 } }, function (err, response) {
      if (err) { return console.error(err) }
      Cart.findOne({ user:  req.user.id }, function (err, doc) {
        if (err) { return console.error(err) }
        	console.log(doc)
        res.send(doc)
      })
    });

	}


});
router.post('/cart/quantity/remove',auth, (req, res) => {


 Cart.updateOne({ user:  req.user.id},
 	   {$pull : { "cart" : {"_id":req.body.cart_id} } } )
 		.then((response) => {


		      Cart.findOne({ user:  req.user.id }, function (err, doc) {
		        if (err) { return console.error(err) }
		        	console.log(doc)
		        res.send(doc)
		      });

 		})
 		.catch(err => console.log(err) );




});

router.post('/cart/save',auth, (req, res) => {



   Cart.findOne({ user: req.user.id })
        .then((result) => {

        	console.log(result);
                	if(result) {

        		console.log("exist");

      
                var check_product = false;

                result.cart.forEach(cart => {
                    if (cart.productid == req.body.productid) {
                        //product exist
                        var quantity = cart.quantity + req.body.quantity;

                        result.cart.pull(cart._id);
                        result.save().then(function () {
                            //add product with updated quantity
                            var dataCart = {

									productid: req.body.productid, 
									price : req.body.price,
									image : req.body.image,
									quantity: quantity,
									productname : req.body.productname,

                            }
                            result.cart.push(dataCart);
                            result.save(function (err) {
                                if (err) return handleError(err);
                                res.send('product updated');
                            });

                        }).catch((err) => {
                            console.log(err);
                        });
                        check_product = true;
                    }
                });

                if (!check_product) {
                	         var dataCart = {

									productid: req.body.productid, 
									price : req.body.price,
									image : req.body.image,
									quantity:req.body.quantity ,
									productname : req.body.productname,

                            }
                    result.cart.push(dataCart);
                    result.save(function (err) {
                        if (err) return handleError(err);
                        res.send('product added');
                    });

                }

  
            }

        	else{
        		     var dataCart = {

									productid: req.body.productid, 
									price : req.body.price,
									image : req.body.image,
									quantity:req.body.quantity ,
									productname : req.body.productname,
                            }
				  var cart = new Cart({

				        user: req.user.id,
				        cart: dataCart
				    });

				    cart.save()
				        .then((cart) => {

				    Cart.findOne({ user: req.user.id })
				        .then((result) => {

							 res.status(200).send(result);

				        })
				        .catch(err => console.log(err));
				        	//find user cart and send 

				           

				    })
				    .catch((err) => {

				            console.log(err);
				    });

        	}

        
        });












  

});


router.post("/cart/check",auth,(req,res) => {


	Cart.findOne({user : req.user.id })
		.then((result) => {


			if(result) {
			console.log(result.cart[0].productid);
			 var check = false;
			for(var i =0;i<result.cart.length;i++) {

				if(result.cart[i].productid == req.body.productid ) {
					check = true;
				}
			}

			if(check) {

			res.status(200).send({message : "exist"});

			}else{

			res.status(200).send({message : "not exist"});

			}

			}else{

				res.status(200).send({message : "empty"});
			}
			


			
		})
		.catch(err => console.log(err));


});



router.get("/cart/items" ,auth, (req,res) => {

	Cart.findOne({user : req.user.id })
		.then((result) => {
			console.log(result);
			res.status(200).send({ data : result });
		})
		.catch(err => console.log(err));

});

router.get("/cart/itemscount" ,auth, (req,res) => {

	Cart.findOne({user : req.user.id })
		.then((result) => {
			var count  = 0;
			if(result) {

				for(var i =0;i<result.cart.length;i++) {

					count++;
		
				}

				
			}
			res.status(200).send({ data : count });
		})
		.catch(err => console.log(err));

});
module.exports = router;