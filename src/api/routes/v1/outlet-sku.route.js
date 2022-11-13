const express = require('express');
const controller = require('../../controllers/outlet-sku.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createOutletSku);

router.route('/:id').put(authenticated, controller.updateOutletSku);

router.route('/:id').delete(authenticated, controller.deleteOutletSku);

module.exports = router;
