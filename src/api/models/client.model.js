const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const clientSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	classification: {
		type: String,
		enum: [
			'FMCG',
			'Heavy Industries',
			'Merchandising',
			'Communication',
			'Financial',
			'Electronics',
			'Agri Products',
			'RealEstate',
		],
	},
	logo: { type: String, require: true },
	phones: [
		{
			type: String,
			ref: 'phone',
		},
	],
	website: { type: String, require: true },
	address: { type: String, require: true },
	email: { type: String, require: true },
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('client', clientSchema, 'clients');
