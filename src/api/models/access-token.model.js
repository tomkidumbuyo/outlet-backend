const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const accessTokenSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	accessToken: { type: String, require: true },
	userId: { type: String, require: true },
	time: { type: Date, require: true, default: Date.now },
	ipAddress: { type: String, require: true },
});

module.exports = dynamoose.model('accessToken', accessTokenSchema, 'accessToken');
