const express = require('express');
const controller = require('../../controllers/client.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createClient);

router.route('/').get(authenticated, controller.getClients);

router.route('/phone/add/:clientId').put(authenticated, controller.addPhoneNumberToClient);

router.route('/phone/remove/:clientId').put(authenticated, controller.removePhoneNumberToClient);

router.route('/brands/:clientId').get(authenticated, controller.getClientBrands);

router.route('/projects/:clientId').get(authenticated, controller.getClientProjects);

router.route('/:clientId').put(authenticated, controller.updateClient);

router.route('/:clientId').get(authenticated, controller.getClientById);

router.route('/:clientId/users').get(authenticated, controller.getClientUsers);

router.route('/:clientId').delete(authenticated, controller.deleteClient);

module.exports = router;
