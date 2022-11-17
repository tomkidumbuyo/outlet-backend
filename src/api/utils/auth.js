const userModel = require('../models/user.model');
const accessTokenModel = require('../models/access-token.model');
const responses = require('../services/response.service');
const jwt = require('jsonwebtoken');

function register(email, password, verifyPassword) {
	return new Promise(async (resolve, reject) => {
		if (!email || email == '') {
			reject(responses.fieldRequired('EMAIL'));
			return;
		}

		if (!password || password == '') {
			reject(responses.fieldRequired('PASSWORD'));
			return;
		}

		if (!verifyPassword || verifyPassword == '') {
			reject(responses.fieldRequired('VERIFY_PASSWORD'));
			return;
		}

		if (password !== verifyPassword) {
			reject(responses.passwordsDoNotMatch());
			return;
		}

		const user = await userModel.findOne({ email: email });
		if (user) {
			reject(responses.userAlreadyExists());
			return;
		}

		const registeredUser = await userModel.create({
			email: email,
			password: password,
		});
		resolve(registeredUser);
	});
}

function login(email, password, req) {
	return new Promise(async (resolve, reject) => {
		if (!email || email == '') {
			reject(responses.fieldRequired('EMAIL'));
			return;
		}

		if (!password || password == '') {
			reject(responses.fieldRequired('PASSWORD'));
			return;
		}

		const user = await userModel.findOne({ email: email });
		if (!user) {
			reject(responses.wrongEmailOrPassword());
			return;
		}

		user.isValid(password, (error, isMatch) => {
			if (error) {
				console.log(error);
				reject(responses.errorLoginIn(error));
				return;
			}

			if (isMatch) {
				jwt.sign({ user }, process.env.JWT_SECRET, async (error, token) => {
					if (error) {
						reject(responses.errorLoginIn(error));
						return;
					}
					const data = await accessTokenModel.create({
						accessToken: token,
						userId: user._id,
						ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
					});

					resolve({ accessToken: data.accessToken, user });
				});
			} else {
				reject(responses.wrongEmailOrPassword());
			}
		});
	});
}

function verify_token(token) {
	return new Promise(async (resolve, reject) => {
		try {
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			const email = decodedToken.user.email;

			await accessTokenModel.create({
				accessToken: token,
			});

			const user = userModel.findOne({ email: email });
			if (!user) {
				reject(responses.errorGettingAuthorizedUser());
			}
			resolve(user);
		} catch (error) {
			reject(responses.errorVerifyingToken(error));
		}
	});
}

module.exports = {
	register: register,
	login: login,
	verify_token: verify_token,
};
