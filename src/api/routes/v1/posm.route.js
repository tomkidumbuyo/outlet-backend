const express = require('express');
const controller = require('../../controllers/posm.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();


router.route('/create').post(authenticated, controller.createPosm)

router.route('/:id').delete(authenticated, controller.deletePosm)

router.route('/:id').get(authenticated, controller.getPosmById)

router.route('/:id').put(authenticated, controller.updatePosm)

router.route('/').get(authenticated, controller.getPosms)

module.exports = router;
