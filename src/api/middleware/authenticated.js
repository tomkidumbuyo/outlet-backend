const httpStatus = require('http-status');
const responses = require('../services/response.service');
const auth = require('../utils/auth');

module.exports = async (req, res, next) => {
	if (req.headers.authorization !== undefined) {
		try {
			const token = req.headers.authorization.split(' ')[1];
			req.user = await auth.verify_token(token);
			console.log(req.user);
			return next();
		} catch (error) {
			return res.status(httpStatus.UNAUTHORIZED).json(error);
		}
	}
	return res.status(httpStatus.UNAUTHORIZED).json(responses.notAuthenticated());
};
