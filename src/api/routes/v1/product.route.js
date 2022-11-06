const express = require('express');
const controller = require('../../controllers/product.controller');
const authenticated = require('../../middleware/authenticated');

const router = express.Router();

router.route('/create').post(authenticated, controller.createProduct)

router.route('/:id').get(authenticated, controller.getProductById)

router.route('/:id').put(authenticated, controller.updateProduct)

router.route('/:id').delete(authenticated, controller.deleteProduct)

router.route('/pagination/:limit/:offset?/:sort?').get(authenticated, controller.pagination)

router.route('/count').get(authenticated, controller.productsCount)

router.route('/').get(authenticated, controller.getAllProducts)


module.exports = router;
