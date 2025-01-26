const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const visitSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	date: { type: Date, require: true },
	outlet: {
		type: String,
		ref: 'outlet',
	},
	project: {
		type: String,
		ref: 'project',
	},
	user: {
		type: String,
		ref: 'user',
	},
	images: [{ type: String, require: true }],
	posmBeforeImages: [{ type: String, require: true }],
	posmAfterImages: [{ type: String, require: true }],
});

module.exports = dynamoose.model('visit', visitSchema, { create: true });
