const express = require('express');

// import all the routes here
const authRoutes = require('./auth.route');
const assetsRoutes = require('./assets.route');
const userRoutes = require('./user.route');
const adminRoutes = require('./admin.controller');
const outlet = require('./outlet.route');
const comment = require('./comment.route');
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

router.use('/api/auth', authRoutes);
router.use('/api/assets', assetsRoutes);
router.use('/api/user', userRoutes);
router.use('/api/admin', adminRoutes);
router.use('/api/outlet', outlet);
router.use('/api/comment', comment);
router.use('/api/sales', sales);
router.use('/api/classification', classification);
router.use('/api/brand', brand);
router.use('/api/client', client);
router.use('/api/product', product);
router.use('/api/project', project);
router.use('/api/file', file);
router.use('/api/posm', posm);
router.use('/api/giveaway', giveaway);
router.use('/api/district', district);
router.use('/api/region', region);
router.use('/api/ward', ward);
router.use('/api/temp', temp);
router.use('/api/outletGiveaway', outletGiveaway);
router.use('/api/outletSku', outletSku);
router.use('/api/outletProduct', outletProduct);
router.use('/api/outletPosm', outletPosm);

module.exports = router;
