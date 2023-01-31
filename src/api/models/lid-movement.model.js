const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lidMovementSchema = new Schema({
	from: { type: String, require: true, enum: ['outlet', 'distributionCenter'] },
	to: { type: String, require: true, enum: ['distributionCenter', 'plant'] },
	amount: { type: Number, require: true },
	verifiedAmount: { type: Number, require: true },
	boxes: [
		{
			number: { type: String, require: true },
			amount: { type: Number, require: true },
			plantAmount: { type: Number, require: true },
		},
	],
	verified: { type: Boolean },
	verifiedBy: {
		type: Schema.ObjectId,
		ref: 'user',
	},
	verifiedTime: { type: Date },
	cancel: { type: Boolean },
	cancelBy: {
		type: Schema.ObjectId,
		ref: 'user',
	},
	cancelTime: { type: Date },
	distributionCenter: {
		type: Schema.ObjectId,
		ref: 'distributionCenter',
	},
	outlet: {
		type: Schema.ObjectId,
		ref: 'outlet',
	},
	status: { type: String, default: 'dispatched' },
	vehicle_number: { type: String },
	date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('lidMovement', lidMovementSchema, 'lidMovements');
