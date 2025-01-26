const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const classSchema = new dynamoose.Schema({
	_id: {
		type: String,
		hashKey: true,
		default: uuidv4,
	},
	platform: { type: String, require: true, enum: ['facebook', 'twitter', 'instagram'] },
	positive: { type: Number, require: true },
	negative: { type: Number, require: true },
	neutral: { type: Number, require: true },
	date: { type: Date, require: true, default: Date.now() },
});

module.exports = dynamoose.model('class', classSchema, 'classs');
