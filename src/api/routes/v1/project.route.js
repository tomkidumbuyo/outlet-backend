const express = require('express');
const controller = require('../../controllers/project.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();


router.route('/create').post(authenticated, controller.createProject)

router.route('/:id').put(authenticated, controller.updateProject)

router.route('/:id').get(authenticated, controller.getProjectById)

router.route('/:id/locations').get(authenticated, controller.getProjectLocations)

router.route('/:id/outlets').get(authenticated, controller.getProjectOutlets)

router.route('/:id/newoutlets').get(authenticated, controller.getProjectAddedOutlets)

router.route('/:id/visits').get(authenticated, controller.getProjectTotalVisits)

router.route('/:id/sales').get(authenticated, controller.getProjectSales)

router.route('/:id/giveaways').get(authenticated, controller.getProjectGiveaways)

router.route('/:id/posms').get(authenticated, controller.getProjectPosm)

router.route('/:id/products').get(authenticated, controller.getProjectProducts)

router.route('/:id/skus').get(authenticated, controller.getProjectSkus)

router.route('/:id/temps').get(authenticated, controller.getProjectTemps)

router.route('/').get(authenticated, controller.getAllProjects)


module.exports = router;
