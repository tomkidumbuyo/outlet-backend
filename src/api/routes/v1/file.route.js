const express = require('express');
const controller = require('../../controllers/file.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/image/save').post(authenticated, controller.createClient);

router.route('/image/delete').post(authenticated, controller.createClient);

module.exports = router;
