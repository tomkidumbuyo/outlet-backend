const express = require('express');
const controller = require('../../controllers/brand.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createBrand);

router.route('/:brandId').put(authenticated, controller.updateBrand);

router.route('/').get(authenticated, controller.getAllBrands);

router.route('/products/:brandId').get(authenticated, controller.getBrandProducts);

router.route('/:brandId').get(authenticated, controller.updateUserPassword);

module.exports = router;
