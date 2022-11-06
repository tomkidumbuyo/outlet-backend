const express = require('express');
const controller = require('../../controllers/user.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();


router.route('/').get(authenticated, controller.getLoggedInUser)

router.route('/outlets').post(authenticated, controller.getUserOutlets)

router.route('/project').get(authenticated, controller.getUserProjects)

router.route('/products').get(authenticated, controller.getUserProducts)

router.route('/sales').get(authenticated, controller.getUserSales)

router.route('/posms').get(authenticated, controller.getUserPosms)

router.route('/giveaways').get(authenticated, controller.getUserGiveaways)

router.route('/outlet/skus').get(authenticated, controller.getUserOutletSkus)

router.route('/outlet/posms').get(authenticated, controller.getUserOutletPosms)

router.route('/outlet/giveaways').get(authenticated, controller.getUserOutletGiveaways)

router.route('/outlet/products').get(authenticated, controller.getUserOutletProducts)

router.route('/all').get(authenticated, controller.getAllUsers)

router.route('/classifications/lastchildren').get(authenticated, controller.getClassificationLastChildren)

router.route('/:id').post(authenticated, controller.getUserById)

router.route('/update').put(authenticated, controller.updateUser)

router.route('/emailAutocomplete').get(authenticated, controller.emailAutocomplete)

router.route('/:id').delete(authenticated, controller.deleteUser)

router.route('/:id/ping').post(authenticated, controller.pingUser)


module.exports = router;
