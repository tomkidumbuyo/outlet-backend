const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const classificationAttributeSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	type: { type: String, require: true, enum: ['number', 'string', 'boolean'] },
	unit: { type: String, require: true },
	classification: {
		type: String,
		ref: 'classification',
		required: false,
	},
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('classificationAttribute', classificationAttributeSchema, 'classificationAttributes');
