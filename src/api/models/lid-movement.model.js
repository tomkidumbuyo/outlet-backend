const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const lidMovementSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	from: { type: String, required: true, enum: ['outlet', 'distributionCenter'] },
	to: { type: String, required: true, enum: ['distributionCenter', 'plant'] },
	amount: { type: Number, required: true },
	verifiedAmount: { type: Number, required: true },
	boxes: {
		type: Array, // Define as an array of objects
		items: {
			type: Object, // Define the object inside the array
			schema: {
				number: { type: String, required: true },
				amount: { type: Number, required: true },
				plantAmount: { type: Number, required: true },
			},
		},
	},
	verified: { type: Boolean },
	verifiedBy: {
		type: String,
		ref: 'user',
	},
	verifiedTime: { type: Date },
	cancel: { type: Boolean },
	cancelBy: {
		type: String,
		ref: 'user',
	},
	cancelTime: { type: Date },
	distributionCenter: {
		type: String,
		ref: 'distributionCenter',
	},
	outlet: {
		type: String,
		ref: 'outlet',
	},
	status: { type: String, default: 'dispatched' },
	vehicle_number: { type: String },
	date: { type: Date, required: true, default: Date.now },
});

module.exports = dynamoose.model('lidMovement', lidMovementSchema, 'lidMovements');
