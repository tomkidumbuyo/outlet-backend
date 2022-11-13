const express = require('express');
const controller = require('../../controllers/outlet-posm.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createOutletPosm);

router.route('/:id').put(authenticated, controller.updateOutletPosm);

router.route('/:id').delete(authenticated, controller.deleteOutletPosm);

module.exports = router;
