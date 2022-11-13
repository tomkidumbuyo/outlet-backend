const express = require('express');
const controller = require('../../controllers/assets.controller');

const router = express.Router();

router.route('/countries').get(controller.getCountries);

router.route('/regions').get(controller.getRegions);

router.route('/districts').get(controller.getDistricts);

router.route('/wards').get(controller.getWards);

router.route('/geo').get(controller.getGeoLocation);

router.route('/adminExists').get(controller.getAdminExists);

// TODO: change name to get ward by location
router.route('/ward').post(controller.getWardsByLocations);

module.exports = router;
