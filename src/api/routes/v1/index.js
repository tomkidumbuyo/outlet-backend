const express = require('express');

// import all the routes here
const authRoutes = require('./auth.route');
const assetsRoutes = require('./assets.route');
const userRoutes = require('./user.route');
const adminRoutes = require('./admin.route');
const outlet = require('./outlet.route');
const sales = require('./sales.route');
const classification = require('./classification.route');
const brand = require('./brand.route');
const client = require('./client.route');
const product = require('./product.route');
const project = require('./project.route');
const file = require('./file.route');
const posm = require('./posm.route');
const giveaway = require('./giveaway.route');
const district = require('./district.route');
const region = require('./region.route');
const ward = require('./ward.route');
const temp = require('./temp.route');
const outletGiveaway = require('./outlet-giveaway.route');
const outletSku = require('./outlet-sku.route');
const outletProduct = require('./outlet-product.route');
const outletPosm = require('./outlet-posm.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/auth', authRoutes);
router.use('/assets', assetsRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/outlet', outlet);
router.use('/sales', sales);
router.use('/classification', classification);
router.use('/brand', brand);
router.use('/client', client);
router.use('/product', product);
router.use('/project', project);
router.use('/file', file);
router.use('/posm', posm);
router.use('/giveaway', giveaway);
router.use('/district', district);
router.use('/region', region);
router.use('/ward', ward);
router.use('/temp', temp);
router.use('/outletGiveaway', outletGiveaway);
router.use('/outletSku', outletSku);
router.use('/outletProduct', outletProduct);
router.use('/outletPosm', outletPosm);

module.exports = router;
