var mongoose = require("mongoose");
var Schema = mongoose.Schema;



const OrderItemSchema = new Schema({
	productname : String,
    productid: String,
    quantity: Number,
    price : Number ,
    image : String

});

var OrderSchema = new Schema({

    user: { type: String, required: true },
    orderitems: [OrderItemSchema],
    subtotal :Number,
    shipping:Number,
    total :Number,
    payment_status : String,
   	delivery_status : String,
   	name : String,
   	email : String ,
   	address : String
});

var order = mongoose.model("Order", OrderSchema);

module.exports = order;