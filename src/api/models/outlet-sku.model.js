const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletSkuSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	stock: { type: Boolean },
	visibility: { type: Boolean },
	price: { type: Number },
	posmVisibility: { type: Number },
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
	sku: {
		type: String,
		ref: 'sku',
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
	created: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outletSku', outletSkuSchema, 'outletSkus');
