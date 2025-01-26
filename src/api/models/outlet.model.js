const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	number: { type: String },
	name: { type: String, required: true },
	owner: { type: String, required: true },
	phone: { type: String },
	countryCode: { type: String },
	tin: { type: String },
	brn: { type: String },
	counters: { type: Number },
	latlng: {
		type: Object, // Use Object to store lat and lng together
		schema: {
			lat: { type: String },
			lng: { type: String },
		},
	},
	location: {
		type: [Number],
		default: [0, 0],
		index: '2dsphere',
	},
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
	project: {
		type: String,
		ref: 'project',
		required: false,
	},
	temp: {
		type: String,
		ref: 'temp',
		required: false,
	},
	classifications: [
		{
			type: String,
			ref: 'classification',
		},
	],
	user: {
		type: String,
		ref: 'user',
		required: false,
	},
	images: [
		{
			type: String,
		},
	],
	town: { type: String },
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outlet', outletSchema, 'outlets');
