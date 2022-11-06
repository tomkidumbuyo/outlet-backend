const express = require('express');
// const validate = require('express-validation');
const controller = require('../../controllers/admin.controller');
// const validation = require('../../validations/user.validation');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/users').get(authenticated, controller.getUsers);

router.route('/lidMovement').get(authenticated, controller.getLidMovement);

router.route('/dispatchs').get(authenticated, controller.getDispatchs);

router.route('/regions').get(authenticated, controller.getRegions);

router.route('/distributionCenters').post(authenticated, controller.getDistributionCenters);

router.route('/outlets').post(authenticated, controller.getOutlets);

router.route('/lidMovements').post(authenticated, controller.getLidMovementsByDistributionCenters);

router.route('/sales').post(authenticated, controller.getSalesByDistributionCenters);

router.route('/verifyDispatch/:id').get(authenticated, controller.verifyDispatch);

router.route('/cancelDispatch/:id').get(authenticated, controller.cancelDispatch);

router.route('/returnDispatch/:id').get(authenticated, controller.returnDispatch);

module.exports = router;
