const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const realDistrictSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
});

module.exports = dynamoose.model('realDistrict', realDistrictSchema, { create: true });
