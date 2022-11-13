const express = require('express');
const controller = require('../../controllers/giveaway.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/').get(controller.getAllGiveaways);

router.route('/:id').get(controller.getGiveawayById);

router.route('/create').post(authenticated, controller.createGiveaway);

router.route('/:id').delete(authenticated, controller.deleteGiveaway);

router.route('/:id').put(authenticated, controller.updateGiveaway);

module.exports = router;
