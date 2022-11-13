const express = require('express');
const controller = require('../../controllers/file.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/image/save').post(authenticated, controller.saveImage);

router.route('/image/delete').post(authenticated, controller.deleteImage);

module.exports = router;
