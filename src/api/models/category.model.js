const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	for: { type: String, require: true, default: 'outlet', enum: ['outlet', 'product'] },
	classification: {
		type: String,
		ref: 'classification',
		require: true,
	},
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('category', categorySchema, 'categories');
