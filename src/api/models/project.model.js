const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

// Define sub-schema for products

// Define main schema
const projectSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	name: { type: String, required: true },
	posmPlacementModule: { type: Boolean, default: true, required: true },
	salesAndOrdersModule: { type: Boolean, default: true, required: true },
	marketSensingModule: { type: Boolean, default: true, required: true },
	giveawaysModule: { type: Boolean, default: true, required: true },
	client: { type: String, ref: 'client' },
	brands: [{ type: String, ref: 'brand' }],
	posms: [{ type: String, ref: 'posm' }],
	giveaways: [{ type: String, ref: 'giveaway' }],
	classifications: [{ type: String, ref: 'classification' }],
	regions: [{ type: String, ref: 'region' }],
	from: { type: Date, required: true },
	to: { type: Date, required: true },
	contactPeople: {
		type: Array,
		items: [
			{
				type: Object,
				schema: {
					name: { type: String, required: true },
					position: { type: String, required: true },
					email: { type: String, required: true },
					phone: { type: String, required: true },
				},
			},
		],
	},
	products: {
		type: Array,
		items: [
			{
				type: Object,
				schema: {
					product: {
						type: String,
						ref: 'product',
					},
					competetiveProducts: {
						type: Array,
						items: [
							{
								type: String,
								ref: 'product',
							},
						],
					},
				},
			},
		],
	},
	date: { type: Date, default: () => new Date(), required: true },
});

// Export the model
module.exports = dynamoose.model('project', projectSchema, { create: true });
