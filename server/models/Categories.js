var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var categorySchema = new Schema({

	category_name : { requried : true ,type : String},
	category_sub_items :[],

});


module.exports = mongoose.model("Categories",categorySchema);