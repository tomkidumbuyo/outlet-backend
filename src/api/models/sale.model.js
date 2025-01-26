const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const saleSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	items: [
		{
			type: String,
			ref: 'saleItem',
		},
	],
	tempId: { type: String },
	order: { type: Boolean },
	outlet: {
		type: String,
		ref: 'outlet',
	},
	visit: {
		type: String,
		ref: 'visit',
	},
	user: {
		type: String,
		ref: 'user',
	},
	project: {
		type: String,
		ref: 'project',
	},
	delivered: { type: Boolean, default: false },
	canceled: { type: Boolean, default: false },
	deliveryDate: { type: Boolean, default: false },
	date: { type: Date, required: true, default: Date() },
});

module.exports = dynamoose.model('sale', saleSchema, { create: true });
