const express = require('express');
const validator = require('express-joi-validation').createValidator({});

const controller = require('../../controllers/auth.controller');
const validation = require('../../validations/auth.validation');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/register').post(validator.body(validation.register.body), controller.register);

router.route('/login').post(validator.body(validation.login.body), controller.login);

router.route('/isLoggedIn').post(validator.body(validation.isLoggedIn.body), controller.isLoggedIn);

router
	.route('/user/:userId')
	.put(
		authenticated,
		validator.params(validation.updateUser.param),
		validator.body(validation.updateUser.body),
		controller.getUserById
	);

router
	.route('/updateUserPassword/:userId')
	.put(authenticated, validator.body(validation.updateUserPassword.body), controller.updateUserPassword);

module.exports = router;
