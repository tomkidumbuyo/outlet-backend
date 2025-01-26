const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletAttributeSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },

	number: { type: Number },
	string: { type: String },
	bool: { type: Boolean },

	user: {
		type: String,
		ref: 'user',
		required: false,
	},
	outlet: {
		type: String,
		ref: 'outlet',
		required: false,
	},
	attribute: {
		type: String,
		ref: 'classificationAttribute',
		required: false,
	},
	created: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outletAttribute', outletAttributeSchema, 'outletAttributes');
