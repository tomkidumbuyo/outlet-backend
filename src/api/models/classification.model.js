const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const classificationSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	for: { type: String, require: true, default: 'outlet', enum: ['outlet', 'product'] },
	attributes: [
		{
			type: String,
			ref: 'classificationAttribute',
			require: false,
		},
	],
	category: {
		type: String,
		ref: 'category',
		require: false,
	},
	color: { type: String, require: true },
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('classification', classificationSchema, 'classifications');
