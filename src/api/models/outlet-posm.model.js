const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletPosmSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	added: { type: Number },
	removed: { type: Number },
	user: {
		type: String,
		ref: 'user',
		required: false,
	},
	outlet: {
		type: String,
		ref: 'outlet',
		required: false,
	},
	posm: {
		type: String,
		ref: 'posm',
		required: false,
	},
	product: {
		type: String,
		ref: 'product',
		required: false,
	},
	project: {
		type: String,
		ref: 'project',
		required: false,
	},
	visit: {
		type: String,
		ref: 'visit',
		required: false,
	},
	images: [
		{
			type: String,
		},
	],
	created: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outletPosm', outletPosmSchema, 'outletPosms');
