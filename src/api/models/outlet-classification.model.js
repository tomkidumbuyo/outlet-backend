const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletClassificationSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	outlet: {
		type: String,
		ref: 'outlet',
	},
	classification: {
		type: String,
		ref: 'classification',
	},
});

module.exports = dynamoose.model('outletClassification', outletClassificationSchema, 'outletClassifications');
