const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const regionSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	code: { type: String, require: true },
	name: { type: String, require: true },
	supervisor: {
		type: String,
		ref: 'user',
	},
});

module.exports = dynamoose.model('region', regionSchema, { create: true });
