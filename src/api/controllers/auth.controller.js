const auth = require('../utils/auth');
const userModel = require('../models/user.model');
const accessTokenModel = require('../models/access-token.model');
const responses = require('../services/response.service');

exports.register = async (req, res, next) => {
	const { email, verifyPassword, password } = req.body;
	try {
		const data = await auth.register(email, password, verifyPassword);
		console.log(data);
		if (req.body.userAttributes) {
			try {
				await userModel.updateOne({ _id: data.user._id }, { $set: req.body.userAttributes });
				data.user = await userModel.findById(data.user._id);
				res.json(data);
			} catch (error) {
				next(error);
			}
		} else {
			res.json(data);
		}
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	auth.login(email, password, req)
		.then((data) => {
			res.json(data);
		})
		.catch((e) => {
			next(e);
		});
};

exports.isLoggedIn = async (req, res, next) => {
	auth.verify_token(req.body.accessToken)
		.then((data) => {
			res.json(data);
		})
		.catch((e) => {
			next(e);
		});
};

exports.getUserById = async (req, res, next) => {
	const userAttributes = req.body;
	if (userAttributes.password) {
		delete userAttributes.password;
	}
	if (userAttributes._id) {
		delete userAttributes._id;
	}
	await userModel.updateOne({ _id: req.params.userId }, { $set: userAttributes });
	const user = await userModel
		.findById(req.params.userId)
		.populate('region')
		.populate('dc');
	res.json(user);
};

// TODO: verify if this works
exports.updateUserPassword = async (req, res, next) => {
	if (req.body.password) {
		try {
			const user = await userModel.findById(req.params.id);
			user.password = req.body.password;
			await accessTokenModel.deleteMany({
				userId: req.params.id,
			});
			await user.save();
			res.json(user);
		} catch (e) {
			next(e);
		}
	} else {
		res.status(500).json({ message: 'password not found' });
	}
};
