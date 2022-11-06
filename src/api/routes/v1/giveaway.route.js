const express = require('express');
const controller = require('../../controllers/giveaway.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.get('/').post(controller.getAllGiveaways);

router.get('/:id').post(controller.getGiveawayById);

router.post('/create').post(authenticated, controller.createGiveaway);

router.delete('/:id').post(authenticated, controller.deleteGiveaway);

router.put('/:id').post(authenticated, controller.updateGiveaway);

module.exports = router;