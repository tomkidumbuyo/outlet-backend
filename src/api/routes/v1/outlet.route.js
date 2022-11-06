const express = require('express');
const controller = require('../../controllers/outlet.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();


router.route('/create').post(authenticated, controller.createOutlet)

router.route('/classifications').get(authenticated, controller.getOutletClassifications)

router.route('/attributes').get(authenticated, controller.getAttributes)

// TODO: find out what this does
router.route('/sync/:datetime').get(authenticated, controller.sync)

router.route('/pagination/:limit/:offset?/:sort?').post(authenticated, controller.paggination)

// TODO: change name to outlet count
router.route('/count').get(authenticated, controller.getOutletCount)

router.route('/byregions').post(authenticated, controller.getOutletsByRegion)

router.route('/:id').get(authenticated, controller.getOutletById)

router.route('/:id/sales').get(authenticated, controller.getOutletSales)

router.route('/:id/visits').get(authenticated, controller.getOutletVisits)

router.route('/:id').put(authenticated, controller.updateOutlet)

router.route('/:id').delete(authenticated, controller.deleteOutlet)

router.route('/').get(authenticated, controller.getAllOutlets)


module.exports = router;
