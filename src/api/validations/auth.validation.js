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
				date_of_birth: Joi.date().optional(),
				ethnicity: Joi.string().optional(),
				sex: Joi.string().optional(),
				adress: Joi.string().optional(),
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
		body: Joi.object({
			firstName: Joi.string().optional(),
			lastName: Joi.string().optional(),
			country: Joi.string().optional(),
			city: Joi.string().optional(),
			about: Joi.string().optional(),
			date_of_birth: Joi.date().optional(),
			ethnicity: Joi.string().optional(),
			sex: Joi.string().optional(),
			adress: Joi.string().optional(),
		}),
	},
	updateUserPassword: {
		body: Joi.object({
			email: Joi.string().required(),
			password: Joi.string().required(),
		}),
	},
};
