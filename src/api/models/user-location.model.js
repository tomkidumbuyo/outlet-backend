const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLocationSchema = new Schema({
	lat: { type: String, require: true },
	lng: { type: String, require: true },
	time: { type: Date, require: true },
	toTime: { type: Date, require: true },
	region: {
		type: Schema.ObjectId,
		ref: 'region',
		required: false,
	},
	district: {
		type: Schema.ObjectId,
		ref: 'district',
		required: false,
	},
	ward: {
		type: Schema.ObjectId,
		ref: 'ward',
		required: false,
	},
	user: {
		type: Schema.ObjectId,
		ref: 'user',
	},
});

module.exports = mongoose.model('userLocation', userLocationSchema, 'userLocations');
