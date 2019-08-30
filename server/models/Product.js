var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProductSchema =new Schema({
	product_name : {type:String , required:true}, 
	product_actual_price : {type:String , required:true}, 
	product_selling_price: {type:String , required:true}, 
	product_image: {type:String , required:true}, 
	product_description : {type:String , required:true},
	product_category : {type:String }, 
	product_sub_category : {type:String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date , default: Date.now },
});


module.exports =  mongoose.model('Product',ProductSchema);