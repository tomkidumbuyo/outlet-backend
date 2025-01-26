const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const wardSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	code: { type: String, require: true },
	name: { type: String, require: true },
	district: {
		type: String,
		ref: 'district',
	},
});

module.exports = dynamoose.model('ward', wardSchema, { create: true });
