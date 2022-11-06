const express = require('express');
const controller = require('../../controllers/ward.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createWard)

router.route('/').get(authenticated, controller.getWards)

router.route('/:id').get(authenticated, controller.getWardById)

router.route('/:id').delete(authenticated, controller.deleteWard)

module.exports = router;
