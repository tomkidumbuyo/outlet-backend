const express = require('express');
const controller = require('../../controllers/outlet-sku.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createOutletSKU);

router.route('/:id').put(authenticated, controller.updateOutletSKU);

router.route('/:id').delete(authenticated, controller.deleteOutletSKU);

module.exports = router;

