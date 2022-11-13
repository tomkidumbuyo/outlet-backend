const express = require('express');
const controller = require('../../controllers/temp.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/:id/visits').get(authenticated, controller.getTempVisits);

router.route('/:id/outlets').get(authenticated, controller.getTempOutlets);

router.route('/:id/allOutlets').get(authenticated, controller.getTempAllOutlets);

router.route('/:id/locations').get(authenticated, controller.getTempLocations);

router.route('/:id/sales').get(authenticated, controller.getTempSales);

router.route('/:id/giveaways').get(authenticated, controller.getTempGiveaway);

router.route('/:id/posms').get(authenticated, controller.getTempPosms);

router.route('/:id/products').get(authenticated, controller.getTempProducts);

router.route('/:id').get(authenticated, controller.getTempById);

module.exports = router;
