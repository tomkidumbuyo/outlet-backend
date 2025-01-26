const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	classifications: [
		{
			type: String,
			ref: 'classification',
		},
	],
	skus: [
		{
			type: String,
			ref: 'sku',
		},
	],
	brand: {
		type: String,
		ref: 'brand',
	},
	image: { type: String, require: true },
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('product', productSchema, { create: true });
