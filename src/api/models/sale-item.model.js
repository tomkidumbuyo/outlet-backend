const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const saleItemSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	sku: {
		type: String,
		ref: 'sku',
	},
	tempId: { type: String },
	sale: {
		type: String,
		ref: 'sku',
	},
	amount: { type: Number },
	priceEach: { type: Number },
});

module.exports = dynamoose.model('saleItem', saleItemSchema, { create: true });
