var express = require("express");
var router = express.Router();
var Order = require("../models/Order");
var auth = require("../router/middlware/auth.js");
var Cart = require("../models/Cart");



router.post('/order/save',auth,(req,res) => {


	   Cart.findOne({ user: req.user.id })
        .then((result) => {

        	if(result) {

        		var total = 0;
        		var sub_total = 0;
        		var shipping = 6;
        		var orderitems = [];
                result.cart.forEach(cart => {

                	var items = {

                			productname : cart.productname,
						    productid: cart.productid,
						    quantity: cart.quantity,
						    price : cart.price ,
						    image : cart.image
                	}
                	orderitems.push(items);

                	sub_total = sub_total + (cart.price * cart.quantity);
              
                });

                total = sub_total + shipping;

                var order = new Order({

					    user: req.user.id,
					    orderitems: orderitems,
					    subtotal :sub_total,
					    shipping:shipping,
					    total :total ,
					    payment_status : "payed",
					    delivery_status : "pending"  ,
                                            name : req.body.name,
                                            email :  req.body.email ,
                                            address :  req.body.address           	

                });

                order.save()
                	  .then((response) => {

                            Cart.deleteOne({ user: req.user.id })
                                .then((response) => {

                                        res.status(200).send({message : "order success" , status : 1});
                                })
                                 .catch(err => console.log(err))
			   

                	  })
                	  .catch(err => console.log(err))
        	}else{

        		     res.status(200).send({message : "cart empty" , status : 0});
        	}


        })
        .catch(err => console.log(err));


});

router.get("/order/list",auth,(req,res) => {

    Order.find({ user: req.user.id })
        .then((result) => {
                    console.log(result);
                     res.status(200).send(result);
        })
        .catch(err => console.log(err));

});


router.get("/order/listitems/:id",auth,(req,res) => {

    Order.findOne({ _id : req.params.id })
        .then((result) => {



                    console.log(result);
                     res.status(200).send(result);
        })
        .catch(err => console.log(err));

});


router.get("/order/cancel/:id",auth,(req,res) => {

    Order.findOne({ _id : req.params.id })
        .then((result) => {

                result.delivery_status = "cancelled";
                result.save().then((response) => {

                    
                    console.log(result);
                     res.status(200).send(response);

                }).catch(err => console.log(err));

                
        })
        .catch(err => console.log(err));

});
module.exports = router;