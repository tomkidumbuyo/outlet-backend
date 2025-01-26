const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const districtSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	code: { type: String, require: true },
	name: { type: String, require: true },
	region: {
		type: String,
		ref: 'region',
	},
});

module.exports = dynamoose.model('district', districtSchema, 'districts');
