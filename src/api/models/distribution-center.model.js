const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');
const District = require('./district.model');
const Region = require('./region.model');
const User = require('./user.model');

const distributionCenterSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, require: true },
	number: { type: String, require: true },
	region: {
		type: Region,
	},
	phone: { type: String },
	district: {
		type: District,
	},
	// supervisor: {
	// 	type: User,
	// },
});

module.exports = dynamoose.model('distributionCenter', distributionCenterSchema, 'distributionCenters');
