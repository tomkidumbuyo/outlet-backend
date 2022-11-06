const express = require('express');
const controller = require('../../controllers/outlet-posm.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createOutletGiveaway);

router.route('/:id').put(authenticated, controller.updateOutletGiveaway);

router.route('/:id').delete(authenticated, controller.deleteOutletGiveaway);

module.exports = router;

