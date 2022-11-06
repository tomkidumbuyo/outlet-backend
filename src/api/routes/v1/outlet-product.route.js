const express = require('express');
const controller = require('../../controllers/outlet-product.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createOutletProduct);

router.route('/:id').put(authenticated, controller.updateOutletProduct);

router.route('/:id').delete(authenticated, controller.deleteOutletProduct);

module.exports = router;
