const { Joi } = require('express-validation');

module.exports = {
	register: {
		body: Joi.object({
			email: Joi.string().required(),
			verifyPassword: Joi.string().required(),
			password: Joi.string().required(),
			userAttributes: {
				firstName: Joi.string().optional(),
				lastName: Joi.string().optional(),
				country: Joi.string().optional(),
				city: Joi.string().optional(),
				about: Joi.string().optional(),
				dateOfBirth: Joi.date().optional(),
				ethnicity: Joi.string().optional(),
				sex: Joi.string().optional(),
				address: Joi.string().optional(),
			},
		}),
	},
	login: {
		body: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
	isLoggedIn: {
		param: Joi.object({
			userId: Joi.string().required(),
		}),
	},
	updateUser: {
		param: Joi.object({
			userId: Joi.string().required(),
		}),
		body: Joi.object({
			firstName: Joi.string()
				.optional()
				.empty(),
			lastName: Joi.string()
				.optional()
				.empty(),
			country: Joi.string()
				.optional()
				.empty(),
			city: Joi.string()
				.optional()
				.empty(),
			about: Joi.string()
				.optional()
				.empty(),
			dateOfBirth: Joi.date()
				.optional()
				.empty(),
			ethnicity: Joi.string()
				.optional()
				.empty(),
			sex: Joi.string()
				.optional()
				.empty(),
			address: Joi.string()
				.optional()
				.empty(),
			phone: Joi.string()
				.optional()
				.empty(),
		}),
	},
	updateUserPassword: {
		body: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
};
