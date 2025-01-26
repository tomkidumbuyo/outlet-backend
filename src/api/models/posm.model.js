const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const posmSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	date: { type: Date, required: true, default: Date() },
});

module.exports = dynamoose.model('posm', posmSchema, 'posms');
