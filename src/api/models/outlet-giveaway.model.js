const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const outletGiveawaySchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	amount: { type: Number },
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
	giveaway: {
		type: String,
		ref: 'giveaway',
		required: false,
	},
	project: {
		type: String,
		ref: 'project',
		required: false,
	},
	visit: {
		type: String,
		ref: 'visit',
		required: false,
	},
	created: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outletGiveaway', outletGiveawaySchema, 'outletGiveaways');
