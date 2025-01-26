const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');
const Project = require('../models/project.model');

// Define main schema
const outletProductSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	tempId: { type: String },
	user: { type: String, ref: 'user', required: false },
	outlet: { type: String, ref: 'outlet', required: false },
	product: { type: String, ref: 'product', required: false },
	project: { type: String, ref: 'project', required: false },
	visit: { type: String, ref: 'visit', required: false },
	posms: {
		type: Array,
		items: [
			{
				type: Object,
				schema: {
					posm: {
						type: String,
						ref: 'posm',
						required: false,
					},
					visible: {
						type: Boolean,
						default: false,
					},
					saved: {
						type: Boolean,
						default: false,
					},
				},
			},
		], // Define the schema for nested objects in posms
	},
	created: { type: Date, default: Date.now },
});

module.exports = dynamoose.model('outletProduct', outletProductSchema, 'outletProducts');
