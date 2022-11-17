const express = require('express');
const controller = require('../../controllers/district.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createDistrict);

router.route('/').get(authenticated, controller.getAllDistricts);

router.route('/:id').get(authenticated, controller.getDistrictById);

router.route('/:id').delete(authenticated, controller.deleteDistrict);

module.exports = router;
