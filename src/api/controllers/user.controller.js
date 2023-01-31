const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../utils/auth');
const visit = require('../utils/visit');
const geojson = require('../utils/geojson');
const projectModel = require('../models/project.model');
const productModel = require('../models/product.model');
const saleModel = require('../models/sale.model');
const saleItemModel = require('../models/sale-item.model');
const userModel = require('../models/user.model');
const outletPosmModel = require('../models/outlet-posm.model');
const outletGiveawayModel = require('../models/outlet-giveaway.model');
const outletProductModel = require('../models/outlet-product.model');
const outletSkuModel = require('../models/outlet-sku.model');
const outletModel = require('../models/outlet.model');
const visitModel = require('../models/visit.model');
const classificationModel = require('../models/classification.model');
const categoryModel = require('../models/category.model');
const userService = require('../services/user.service');
const fs = require('fs');

exports.getLoggedInUser = (req, res) => {
	user = req.user.toObject();
	res.json(user);
};

exports.getUserOutlets = async (req, res) => {
	try {
		var startDate = new Date();

		results = [];
		project = await projectModel.findById(req.user.project).populate('regions');

		// loc = await geojson.getLocation(req.body.lat, req.body.lng);
		// outlets = await outletModel.find({'region': { $in: project.regions.map(region => mongoose.Types.ObjectId(region._id)) }})

		outlets = await outletModel
			.find({
				location: {
					$near: {
						$maxDistance: 40 * 1000, // 40km
						$geometry: {
							type: 'Point',
							coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)], // [lon, lat]
						},
					},
				},
			})
			.sort('name')
			.populate('region')
			.populate('district')
			.populate('ward')
			.populate('classifications');
		outlets = outlets.filter((outlet) =>
			outlet.classifications.some((item) => project.classifications.includes(item._id))
		);

		visits = await visitModel.find({ project: project, outlet: { $in: outlets.map((o) => o._id) } });
		myVisits = visits.filter((visit) => visit.user.equals(req.user._id));
		myTodayVisit = myVisits.filter((visit) => isToday(visit.date));
		orders = await saleModel.find({ project: project, order: true, delivered: false });

		results = outlets.map((outlet) => {
			outlet = outlet.toObject();
			visitts = myTodayVisit.filter((visit) => visit.outlet.equals(outlet._id));
			if (visitts.length > 0) {
				visitt = visitts[0];
				outlet.posmBeforeImages = visitt.posmBeforeImages;
				outlet.posmAfterImages = visitt.posmAfterImages;
			} else {
				outlet.posmBeforeImages = [];
				outlet.posmAfterImages = [];
			}

			outlet.visits = visits.filter((visit) => visit.outlet.equals(outlet._id));
			outlet.hasVisit = outlet.visits.length > 0 ? true : false;
			outlet.orderNumber = orders.filter((order) => order.outlet.equals(outlet._id)).length;
			return outlet;
		});

		var endEndDate = new Date();

		res.json(results);
	} catch (e) {
		next(e);
	}
};

const isToday = (someDate) => {
	const today = new Date();
	return (
		someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear()
	);
};

exports.getUserProjects = async (req, res) => {
	if (req.user.project) {
		project = await projectModel.findById(req.user.project._id).populate({ path: 'products' });
		res.json(project);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserProducts = async (req, res) => {
	if (req.user.project) {
		project = await projectModel.findById(req.user.project._id);

		productIDs = [];
		for (const p of project.products) {
			productIDs.push(p.product);
			productIDs = productIDs.concat(p.competetiveProducts);
		}

		// productIDs = project.products.filter(product => mongoose.Types.ObjectId(product.product));
		products = await productModel
			.find({ _id: { $in: productIDs } })
			.populate({ path: 'skus', model: 'sku' })
			.map((prdt) => {
				prdt = prdt.toObject();
				prdt.project = project._id;
				return prdt;
			});
		res.json(products);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserSales = async (req, res) => {
	if (req.user.project) {
		project = await projectModel.findById(req.user.project._id);
		sales = await saleModel.find({ project: project, user: req.user._id }).populate('items');
		for (const sale of sales) {
			sale.items = await saleItemModel.find({ sale: sale });
		}
		res.json(sales);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserPosms = async (req, res) => {
	if (req.user.project) {
		project = await projectModel.findById(req.user.project._id).populate('posms');
		res.json(project.posms);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserGiveaways = async (req, res) => {
	if (req.user.project) {
		project = await projectModel.findById(req.user.project._id).populate('giveaways');
		res.json(project.giveaways);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserOutletSkus = async (req, res) => {
	if (req.user.project) {
		visits = await visit.userTodayVisits(req.user);
		outletSkus = await outletSkuModel.find({ visit: { $in: visits.map((visit) => visit._id) } });
		res.json(outletSkus);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserOutletPosms = async (req, res) => {
	if (req.user.project) {
		visits = await visit.userTodayVisits(req.user);
		outletPosms = await outletPosmModel.find({ visit: { $in: visits.map((visit) => visit._id) } });
		res.json(outletPosms);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserOutletGiveaways = async (req, res) => {
	if (req.user.project) {
		visits = await visit.userTodayVisits(req.user);
		outletGiveaways = await outletGiveawayModel.find({ visit: { $in: visits.map((visit) => visit._id) } });
		res.json(outletGiveaways);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

exports.getUserOutletProducts = async (req, res) => {
	if (req.user.project) {
		visits = await visit.userTodayVisits(req.user);
		outletProducts = await outletProductModel.find({ visit: { $in: visits.map((visit) => visit._id) } });
		res.json(outletProducts);
	} else {
		res.status(500).json({
			error: 'user Does not have current project running',
		});
	}
};

// TODO:find out if this function is being used
exports.getAllUsers = async (req, res) => {
	user = req.user.toObject();
	res.json(user);
};

// TODO: find out what this function does
exports.getClassificationLastChildren = async (req, res) => {
	try {
		let classifications = await classificationModel.find({ for: 'outlet' }).populate('attributes');
		let categories = await categoryModel.find({ for: 'outlet' });
		let project = await projectModel.findById(req.user.project);

		classifications = classifications.filter(
			(classification) =>
				!(categories.filter((category) => category.classification == classification._id).length > 0)
		);
		classifications = classifications.map((classification) => {
			classification = classification.toObject();
			classification.inProject =
				project.classifications.filter((cls) => classification._id.equals(cls)).length > 0;
			return classification;
		});
		let t4 = new Date().getTime();
		res.json(classifications);
	} catch (e) {
		next(e);
	}
};

// TODO: find if this functio is being used
exports.getUserById = (req, res) => {
	userModel
		.findOne({ createdBy: req.user })
		.then((data) => {})
		.catch((err) => {});
};

exports.updateUser = async (req, res) => {
	await userModel.findOneAndUpdate({ _id: req.params.userId }, req.body);
	const user = await userModel.findById(req.params.userId);
	res.json(user);
};

exports.emailAutocomplete = async (req, res) => {
	userModel.find(
		{
			email: { $regex: req.query.query, $options: 'i' },
		},
		function(err, docs) {
			if (err) {
				res.status(500).json(err);
				return;
			}
			if (!docs.length) {
				res.json([]);
				return;
			}
			res.json(docs);
		}
	);
};

exports.deleteUser = async (req, res) => {
	if (req.user._id == req.params.id) {
		res.status(500).json({ error: 'You cannot delete the loged in user.' });
		return;
	}

	if (req.user._id == 'admin') {
		res.status(500).json({ error: 'You do not have admin privilages.' });
		return;
	}

	user = await userModel.findById(req.params.id);
	await user.delete();

	res.json({ status: 'success' });
};

// TODO: find out what this is doing here?.
exports.pingUser = async (req, res) => {
	try {
		user = await userService.ping(req.body, req.user);
		res.json(req.body);
	} catch (error) {
		res.status(500).json({ error: error });
	}
};
