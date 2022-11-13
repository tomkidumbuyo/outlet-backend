const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const mongoose = require('mongoose');
const projectModel = require('../models/project.model');
const productModel = require('../models/product.model');
const saleModel = require('../models/sale.model');
const outletPosmModel = require('../models/outlet-posm.model');
const outletGiveawayModel = require('../models/outlet-giveaway.model');
const outletSkuModel = require('../models/outlet-sku.model');
const outletProductModel = require('../models/outlet-product.model');
const districtModel = require('../models/district.model');
const wardModel = require('../models/ward.model');
const outletModel = require('../models/outlet.model');
const visitModel = require('../models/visit.model');
const tempModel = require('../models/temp.model');
const userModel = require('../models/user.model');

exports.createProject = async (req, res) => {
	try {
		project = await projectModel.create({
			name: req.body.name,
			client: req.body.client,
			brands: req.body.brands,
			from: req.body.from,
			to: req.body.to,
			contactPeople: req.body.contactPeople,
			products: req.body.products,
			regions: req.body.regions,
			posms: req.body.posms,
			classifications: req.body.classifications,
			giveaways: req.body.giveaways,
			posmPlacementModule: req.body.posmPlacementModule,
			salesAndOrdersModule: req.body.salesAndOrdersModule,
			marketSensingModule: req.body.marketSensingModule,
			giveawaysModule: req.body.giveawaysModule,
		});
		res.json(project);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error creating new project.' });
	}
};

exports.updateProject = async (req, res) => {
	try {
		project = await projectModel.findById(req.params.id);
		project.name = req.body.name;
		project.client = req.body.client;
		project.brands = req.body.brands;
		project.from = req.body.from;
		project.to = req.body.to;
		project.contactPeople = req.body.contactPeople;
		project.products = req.body.products;
		project.regions = req.body.regions;
		project.posms = req.body.posms;
		project.classifications = req.body.classifications;
		project.giveaways = req.body.giveaways;
		project.posmPlacementModule = req.body.posmPlacementModule;
		project.salesAndOrdersModule = req.body.salesAndOrdersModule;
		project.marketSensingModule = req.body.marketSensingModule;
		project.giveawaysModule = req.body.giveawaysModule;
		await project.save();
		res.json(project);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error creating new project.' });
	}
};

exports.getProjectById = async (req, res) => {
	project = await projectModel
		.findById(req.params.id)
		.populate('regions')
		.populate('brands')
		.populate('client')
		.populate('posms')
		.populate('giveaways')
		.populate('classifications')
		.exec()
		.then((project) => {
			project = project.toObject();
			pdts = project.products;

			ids = [];
			for (const p of project.products) {
				ids.push(p.product);
				ids = ids.concat(p.competetiveProducts);
			}

			productModel
				.find({
					_id: { $in: ids },
				})
				.populate('skus')
				.exec()
				.then(async (products) => {
					project.products = project.products.map((p) => {
						let product = products.filter((prdt) => p.product.equals(prdt._id))[0].toObject();
						product.competetiveProducts = products.filter((prdt) =>
							p.competetiveProducts.some((cp) => cp.equals(prdt._id))
						);
						return product;
					});
					res.json(project);
				})
				.catch((err) => {
					console.error(err);
					res.status(500).json({ error: 'Error getting project competetive products.' });
				});
		})
		.catch((err) => {
			console.error(err);
			res.status(500).json({ error: 'Error getting project product.' });
		});
};

exports.getProjectLocations = async (req, res) => {
	try {
		project = await projectModel.findById(req.params.id).populate('regions');
		let regions = project.regions.map((region) => region.toObject());

		let districts = (
			await districtModel.find({
				region: { $in: regions.map((region) => mongoose.Types.ObjectId(region._id)) },
			})
		).map((region) => region.toObject());

		let wards = (
			await wardModel.find({
				district: { $in: districts.map((district) => mongoose.Types.ObjectId(district._id)) },
			})
		).map((region) => region.toObject());

		regions = regions.map((region) => {
			region.districts = districts
				.filter((district) => district.region.equals(region._id))
				.map((district) => {
					district.wards = wards.filter((ward) => ward.district.equals(district._id));
					return district;
				});
			return region;
		});

		res.json(regions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectOutlets = async (req, res) => {
	try {
		results = [];
		project = await projectModel.findById(req.params.id).populate('regions');
		let outlets = await outletModel
			.find({
				region: { $in: project.regions.map((region) => mongoose.Types.ObjectId(region._id)) },
			})
			.sort('name')
			.populate('region')
			.populate('district')
			.populate('ward')
			.populate('classifications');

		for (let outlet of outlets) {
			if (outlet.classifications.some((item) => project.classifications.includes(item._id))) {
				results.push(outlet);
			}
		}

		res.json(results);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectAddedOutlets = async (req, res) => {
	try {
		let outlets = await outletModel
			.find({ project: req.params.id })
			.sort('name')
			.populate('region')
			.populate('district')
			.populate('ward')
			.populate('classifications')
			.populate('user');
		res.json(outlets);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectTotalVisits = async (req, res) => {
	try {
		let visits = await visitModel.find({ project: req.params.id });
		res.json(visits);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectSales = async (req, res) => {
	try {
		let sales = await saleModel.find({ project: req.params.id }).populate('items');
		res.json(sales);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectGiveaways = async (req, res) => {
	try {
		let visits = await visitModel.find({ project: req.params.id });
		let giveaways = await outletGiveawayModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('giveaway');
		res.json(giveaways);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectPosm = async (req, res) => {
	try {
		let visits = await visitModel.find({ project: req.params.id });
		let posms = await outletPosmModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('posm');
		res.json(posms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectProducts = async (req, res) => {
	try {
		let visits = await visitModel.find({ project: req.params.id });
		let posms = await outletProductModel.find({ project: req.params.id }).populate('posms.posm');
		res.json(posms);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectSkus = async (req, res) => {
	try {
		let visits = await visitModel.find({ project: req.params.id });
		let products = await outletSkuModel.find({
			visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) },
		});
		res.json(products);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error });
	}
};

exports.getProjectTemps = async (req, res) => {
	users = await userModel.find({ project: req.params.id });
	for (const user of users) {
		temp = await tempModel.findOne({ user: user, project: req.params.id });
		if (!temp) {
			await tempModel.create({ user: user, project: req.params.id });
		}
	}

	temps = await tempModel.find({ project: req.params.id }).populate('user');
	res.json(temps);
};

exports.getAllProjects = async (req, res) => {
	try {
		projects = await projectModel
			.find()
			.populate('regions')
			.populate('brands')
			.populate('client')
			.populate('posms')
			.populate('giveaways');
		res.json(projects);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Error creating new project.' });
	}
};
