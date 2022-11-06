const lidMovementModel = require('../models/lid-movement.model');
const userModel = require('../models/user.model');
const regionModel = require('../models/region.model');
const distributionCenterModel = require('../models/distribution-center.model');
const outletModel = require('../models/outlet.model');
const saleModel = require('../models/sale.model');

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await userModel
			.find({})
			.populate('region')
			.populate('dc');
		res.json(users);
	} catch (e) {
		next(e);
	}
};

exports.getLidMovement = async (req, res, next) => {
	try {
		const lidMovement = await lidMovementModel.find({});
		res.json(lidMovement);
	} catch (e) {
		next(e);
	}
};

exports.getDispatchs = async (req, res, next) => {
	try {
		const lidMovement = await lidMovementModel.find({
			to: 'plant',
		});
		res.json(lidMovement);
	} catch (e) {
		next(e);
	}
};

exports.getRegions = async (req, res, next) => {
	try {
		const regions = await regionModel.find({});
		res.json(regions);
	} catch (e) {
		next(e);
	}
};

exports.getDistributionCenters = async (req, res, next) => {
	try {
		const distributionCenter = await distributionCenterModel
			.find({ region: { $in: req.body.regions } })
			.populate('supervisor');
		res.json(distributionCenter);
	} catch (e) {
		next(e);
	}
};

exports.getOutlets = async (req, res, next) => {
	try {
		const outlets = await outletModel.find({ region: { $in: req.body.regions } });
		res.json(outlets);
	} catch (e) {
		next(e);
	}
};

exports.getLidMovementsByDistributionCenters = async (req, res, next) => {
	try {
		const lidMovements = await lidMovementModel
			.find({ distributionCenter: { $in: req.body.distributionCenters } })
			.populate('outlet')
			.populate('distributionCenter');
		res.json(lidMovements);
	} catch (e) {
		next(e);
	}
};

exports.getSalesByDistributionCenters = async (req, res, next) => {
	try {
		const sales = await saleModel.find({
			distributionCenter: { $in: req.body.distributionCenters },
		});
		res.json(sales);
	} catch (e) {
		next(e);
	}
};

exports.verifyDispatch = async (req, res, next) => {
	const lidMovement = await lidMovementModel.findById(req.params.id);
	lidMovement.verified = true;
	lidMovement.verified_by = req.user.id;
	lidMovement.verified_time = new Date();
	await lidMovement.save();
	res.json(lidMovement);
};

exports.cancelDispatch = async (req, res, next) => {
	const lidMovement = await lidMovementModel.findById(req.params.id);
	lidMovement.cancel = true;
	lidMovement.cancel_by = req.user.id;
	lidMovement.cancel_time = new Date();
	await lidMovement.save();
	res.json(lidMovement);
};

exports.returnDispatch = async (req, res, next) => {
	const lidMovement = await lidMovementModel.findById(req.params.id);
	lidMovement.verified = false;
	lidMovement.verified_by = null;
	lidMovement.verified_time = null;
	await lidMovement.save();
	res.json(lidMovement);
};
