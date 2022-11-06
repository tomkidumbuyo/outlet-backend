const express = require('express');
const controller = require('../../controllers/region.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.creteRegion)

router.route('/').get(authenticated, controller.getAllRegions)

router.route('/:id').get(authenticated, controller.getRegionById)

router.route('/:id').delete(authenticated, controller.deleteRegion)

module.exports = router;
