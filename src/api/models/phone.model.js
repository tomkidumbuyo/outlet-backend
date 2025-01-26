const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const phoneSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	countryCode: { type: String, require: true },
	nationalNumber: { type: String, require: true },
	number: { type: String, require: true },
	dialCode: { type: String, require: true },
	internationalNumber: { type: String, require: true },
	e164Number: { type: String, require: true },
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('phone', phoneSchema, 'phones');
