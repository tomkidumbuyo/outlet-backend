const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
	accessToken: { type: String, require: true },
	userId: { type: String, require: true },
	time: { type: Date, require: true, default: Date.now },
	ipAddress: { type: String, require: true },
});

module.exports = mongoose.model('accessToken', accessTokenSchema, 'accessToken');
