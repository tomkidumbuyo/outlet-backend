const express = require('express');
const router = express.Router();
const outletModel = require('../models/outlet.model');
const saleModel = require('../models/sale.model');
const districtModel = require('../models/district.model');
const outletClassificationModel = require('../models/outlet-classification.model');
const outletAttributeModel = require('../models/outlet-attribute.model');
const visitModel = require('../models/visit.model');
const outletPosmModel = require('../models/outlet-posm.model');
const outletGiveawayModel = require('../models/outlet-giveaway.model');
const outletSkuModel = require('../models/outlet-sku.model');

const auth = require('../utils/auth');
const geojson = require('../utils/geojson');
const outletService = require('../services/outlet.service');

exports.createOutlet = async (req, res) => {
	try {
		data = await outletService.create(req.body, req.user);
		res.json(data);
	} catch (error) {
		next(error);
	}
};

exports.getClassifications = async (req, res) => {
	try {
		outletClassification = await outletClassificationModel.find({});
		if (outletClassification == null) {
			outletClassification = [];
		}
		res.json(outletClassification);
	} catch (error) {
		next(error);
	}
};

exports.getAttributes = async (req, res) => {
	try {
		outletAttribute = await outletAttributeModel.find({});
		if (outletAttribute == null) {
			outletAttribute = [];
		}
		res.json(outletAttribute);
	} catch (error) {
		next(error);
	}
};

exports.sync = async (req, res) => {
	try {
		date = new Date(req.params.datetime);
		outlets = await outletModel.find({ created: null });
		outlets = await outletModel.find({ $or: [{ created: { $gte: date } }, { edited: { $gte: date } }] });
		res.json(outlets);
	} catch (error) {
		next(error);
	}
};

exports.paggination = async (req, res) => {
	try {
		outlets = await outletModel
			.find()
			.sort(req.params.sort ? req.params.sort : 'name')
			.skip(req.params.offset ? parseInt(req.params.offset) : 0)
			.limit(parseInt(req.params.limit))
			.populate('region')
			.populate('district')
			.populate('ward')
			.populate('classifications');

		for (const outlet of outlets) {
			if (outlet.classifications.length > 1) {
				outlet.classifications = removeDuplicates(outlet.classifications);
				await outlet.save();
			}
		}

		res.json(outlets);
	} catch (error) {
		next(error);
	}
};

exports.getOutletCount = async (req, res) => {
	outletModel.countDocuments({}, (error, count) => {
		if (error) {
			next(error);
		}
		res.json({ count: count });
	});
};

exports.getOutletsByRegion = async (req, res) => {
	try {
		districts = await districtModel.find({ region: { $in: req.body.regions } });
		outlets = await outletModel.find({ district: { $in: districts.map((district) => district._id) } });
		res.json(outlets);
	} catch (error) {
		next(error);
	}
};

exports.getOutletById = async (req, res) => {
	try {
		outlet = await outletModel
			.findById(req.params.id)
			.populate('region')
			.populate('district')
			.populate('ward');
		outletClassifications = await outletClassificationModel.find({ outlet: outlet }).populate('classification');
		outlet.classifications = outletClassifications.map(
			(outletClassification) => outletClassification.classification
		);
		res.json(outlet);
	} catch (error) {
		next(error);
	}
};

exports.getOutletSales = async (req, res) => {
	try {
		sales = await saleModel.find({ outlet: req.params.id }).populate('project');
		res.json(sales);
	} catch (error) {
		next(error);
	}
};

exports.getOutletVisits = async (req, res) => {
	try {
		result = [];
		visits = await visitModel
			.find({ outlet: req.params.id })
			.populate('project')
			.populate('user')
			.populate('outlet');
		for (let visit of visits) {
			visit = visit.toObject();
			visit.posms = await outletPosmModel.find({ visit: visit._id }).populate('posm');
			visit.giveaways = await outletGiveawayModel.find({ visit: visit._id }).populate('giveaway');
			visit.products = await outletSkuModel.find({ visit: visit._id });
			visit.sales = await saleModel.find({ visit: visit._id }).populate('items');
			result.push(visit);
		}

		res.json(result);
	} catch (error) {
		next(error);
	}
};

exports.updateOutlet = async (req, res) => {
	try {
		data = await outletService.update(req.body, req.user);
		res.json(data);
	} catch (error) {
		next(error);
	}
};

exports.deleteOutlet = async (req, res) => {
	try {
		outlet = await outletModel.findById(req.params.id);
		await outlet.delete();
		res.json({ status: 'success' });
	} catch (error) {
		next(error);
	}
};

exports.getAllOutlets = async (req, res) => {
	try {
		outlets = await outletModel
			.find()
			.sort('name')
			.populate('region')
			.populate('district')
			.populate('ward')
			.populate('classifications');

		for (const outlet of outlets) {
			if (!outlet.ward) {
				loc = await geojson.getLocation(outlet.latlng.lat, outlet.latlng.lng);
				outlet.ward = loc.ward;
				outlet.district = loc.district;
				outlet.region = loc.region;
				await outlet.save();
			}

			if (!outlet.classifications || outlet.classifications.length == 0) {
				outletClassifications = await outletClassificationModel
					.find({ outlet: outlet })
					.populate('classification');
				outlet.classifications = outletClassifications.map(
					(outletClassification) => outletClassification.classification
				);
				await outlet.save();
			}
		}
		res.json(outlets);
	} catch (error) {
		next(error);
	}
};

removeDuplicates = function(array) {
	var uniqueNames = [];
	for (const el of array) {
		if (!uniqueNames.includes(el)) uniqueNames.push(el);
	}
	return uniqueNames;
};
