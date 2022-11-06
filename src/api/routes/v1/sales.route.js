const express = require('express');
const controller = require('../../controllers/sales.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();


router.route('/create').post(authenticated, controller.createSale)

router.route('/:id').put(authenticated, controller.updateSale)

router.route('/:id').delete(authenticated, controller.deleteSale)

router.route('/').get(authenticated, controller.getSales)


module.exports = router;
