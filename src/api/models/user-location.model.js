const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const userLocationSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	lat: { type: String, require: true },
	lng: { type: String, require: true },
	time: { type: Date, require: true },
	toTime: { type: Date, require: true },
	region: {
		type: String,
		ref: 'region',
		required: false,
	},
	district: {
		type: String,
		ref: 'district',
		required: false,
	},
	ward: {
		type: String,
		ref: 'ward',
		required: false,
	},
	user: {
		type: String,
		ref: 'user',
	},
});

module.exports = dynamoose.model('userLocation', userLocationSchema, { create: true });
