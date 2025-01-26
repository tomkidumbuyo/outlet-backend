const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const brandSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, required: true },
	logo: { type: String },
	client: {
		type: String,
		ref: 'client',
	},
	manager: {
		type: Object, // Define manager as an object
		schema: {
			name: { type: String, required: true },
			phones: [
				{
					type: String,
					ref: 'phone',
				},
			],
			email: { type: String, required: true },
		},
	},
	date: { type: Date, required: true, default: Date.now() },
});

module.exports = dynamoose.model('brand', brandSchema, 'brands');
