const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CustomerSchema = new Schema({

	name : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required:true,
		unique:true
	},
	password : {
		type : String,
		required : true
	},
	register_date : {
		type : Date,
		default : Date.now
	}
});

module.exports = Customer = mongoose.model('customer',CustomerSchema);