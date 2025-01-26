const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const Project = require('../models/project.model');
const Client = require('../models/client.model');
const Region = require('../models/region.model');
const DistributionCenter = require('../models/distribution-center.model');

SALT_WORK_FACTOR = 10;

const userSchema = new dynamoose.Schema(
	{
		_id: {
			type: String,
			hashKey: true,
			default: uuidv4,
		},
		email: { type: String, require: true, index: { global: true } },
		firstName: { type: String },
		lastName: { type: String },
		password: { 
			type: String, 
			require: true,
			set: async (password) => {
				if (!password.startsWith('$2b$')) {
					const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
					password = await bcrypt.hash(password, salt);
					return password;
				}
				get: null
			},
		},
		dateOfBirth: { type: Date },
		sex: { type: String, enum: ['male', 'female'] },
		phone: { type: String },
		address: { type: String },
		project: {
			type: Project,
		},
		client: {
			type: Client,
		},
		type: {
			type: String,
			require: true,
			enum: ['admin', 'distributionCenter', 'regionalSuperviser', 'aim', 'plant', 'temp', 'client'],
		},
		isAdmin: { type: Boolean, require: true, default: false },
		region: {
			type: Region,
		},
		dc: {
			type: DistributionCenter,
		},
	},
	{
		timestamps: true,
		hooks: {
			before: {

			},
		},
	}
);

userSchema.methods = {
	isValid: async function(candidatePassword) {
		return bcrypt.compare(candidatePassword, this.password);
	},
};

userSchema.options = {
	toJSON: {
		transform: function(doc, ret) {
			delete ret.password; // Remove password from the returned object
			return ret;
		},
	},
};

module.exports = dynamoose.model('user', userSchema);
