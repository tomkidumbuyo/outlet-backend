const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const skuSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	sku: { type: String, require: true },
	price: { type: Number, require: true },
	product: {
		type: String,
		ref: 'product',
	},
});

module.exports = dynamoose.model('sku', skuSchema, { create: true });
