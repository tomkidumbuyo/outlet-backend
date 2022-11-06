const express = require('express');
const controller = require('../../controllers/classification.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/').get(authenticated, controller.getNestedClassifications);

router.route('/categories').get(controller.getCategories);

router.route('/outlet/categories').get(controller.getOutletCategories);

router.route('/classifications').get(controller.getClassifications);

router.route('/outlet/classifications').get(controller.getOutletClassifications);

router.route('/category/create').post(authenticated, controller.createCategory);

router.route('/classification/create').post(authenticated, controller.createClassification);

router.route('/classification/:id').get(authenticated, controller.getClassificationById);

router.route('/category/:id').get(authenticated, controller.getCategoryById);

router.route('/classification/:id').put(controller.updateClassificationById);

router.route('/classification/:id').delete(controller.deleteClassificationById);

router.route('/category/:id').delete(controller.deleteCategoryById);

router.route('/attributes/add/:classificationId').post(authenticated, controller.addAttribute);

router.route('/attributes').get(authenticated, controller.createBrand);

module.exports = router;
