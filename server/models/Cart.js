var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;



const CartItemSchema = new Schema({
	productname : String,
    productid: String,
    quantity: Number,
    price : Number ,
    image : String

});

var CartSchema = new Schema({

    user: { type: String, required: true },
    cart: [CartItemSchema],
   
});

var cart = mongoose.model("Cart", CartSchema);

module.exports = cart;