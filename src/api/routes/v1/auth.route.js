const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const authController = require('../../controllers/auth.controller');
const userController = require('../../controllers/user.controller');
const validation = require('../../validations/auth.validation');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/register').post(validator.body(validation.register.body), authController.register);

router.route('/login').post(validator.body(validation.login.body), authController.login);

router.route('/isLoggedIn').get(authenticated, authController.isLoggedIn);

router.route('/user/:userId').get(authenticated, authController.getUserById);

router
	.route('/user/:userId')
	.put(
		authenticated,
		validator.params(validation.updateUser.param),
		validator.body(validation.updateUser.body),
		userController.updateUser
	);

router
	.route('/updateUserPassword/:userId')
	.put(authenticated, validator.body(validation.updateUserPassword.body), authController.updateUserPassword);

module.exports = router;
