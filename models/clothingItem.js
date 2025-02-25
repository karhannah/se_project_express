const mongoose = require( 'mongoose' );
const validator = require( 'validator' );

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'The name field is required' ],
		minlength: 2,
		maxlength: 30
	},
	weather: {
		type: String,
		required: [ true, 'The weather field is required' ],
		enum: [ 'hot', 'warm', 'cold' ]
	},
	imageUrl: {
		type: String,
		required: [ true, 'The URL field is required' ],
		validate: {
			validator( v ) {
				return validator.isURL( v );
			},
			message: 'URL not valid',
		}
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	likes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: true
	}],
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: Date.now
	}
	
});

module.exports = mongoose.model( 'item', itemSchema );
