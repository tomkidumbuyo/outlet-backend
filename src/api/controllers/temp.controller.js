const express = require('express');
const mongoose = require('mongoose');
const tempModel = require('../models/temp.model');
const outletModel = require('../models/outlet.model');
const visitModel = require('../models/visit.model');
const userLocationModel = require('../models/user-location.model');
const geojson = require('../utils/geojson');
const outletPosmModel = require('../models/outlet-posm.model');
const outletSkuModel = require('../models/outlet-sku.model');
const outletGiveawayModel = require('../models/outlet-giveaway.model');
const saleModel = require('../models/sale.model');

exports.getTempVisits = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel
			.find({ user: temp.user, project: temp.project })
			.populate('project')
			.populate('user');
		res.json(visits);
	} catch (e) {
		next(e);
	}
};

exports.getTempOutlets = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		outlets = await outletModel.find({ temp: temp });
		res.json(outlets);
	} catch (e) {
		next(e);
	}
};

// TODO: find out the difference between outlets and all outlets for temps
exports.getTempAllOutlets = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel.find({ user: temp.user, project: temp.project });
		outlets = await outletModel.find({
			$or: [{ temp: temp }, { _id: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit.outlet)) } }],
		});

		res.json(outlets);
	} catch (e) {
		next(e);
	}
};

exports.getTempLocations = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id).populate('project');
		userLocations = await userLocationModel
			.find({
				user: temp.user,
				time: { $gte: temp.project.from, $lte: temp.project.to },
			})
			.populate('ward')
			.populate('district')
			.populate('region');

		let results = [];
		for (let userLocation of userLocations) {
			if (!userLocation.toTime) {
				userLocation.toTime = userLocation.time;
				await userLocation.save();
			}

			if (
				results.length > 0 &&
				userLocation.lat == results[results.length - 1].lat &&
				userLocation.lng == results[results.length - 1].lng
			) {
				results[results.length - 1].toTime = userLocation.toTime;
				if (
					new Date(userLocation.time).getTime() - new Date(userLocation.toTime).getTime() <
					60 * 60 * 24 * 1000
				) {
					await results[results.length - 1].save();
					await userLocation.delete();
				} else {
					results.push(userLocation);
				}
			} else {
				results.push(userLocation);
			}

			if (!userLocation.ward) {
				loc = await geojson.getLocation(userLocation.lat, userLocation.lng);
				userLocation.ward = loc.ward;
				userLocation.district = loc.district;
				userLocation.region = loc.region;
				await userLocation.save();
			}
		}
		res.json(results);
	} catch (e) {
		next(e);
	}
};

exports.getTempSales = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel.find({ user: temp.user, project: temp.project });
		let sales = await saleModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('items');
		res.json(sales);
	} catch (e) {
		next(e);
	}
};

exports.getTempGiveaway = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel.find({ user: temp.user, project: temp.project });
		let giveaways = await outletGiveawayModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('giveaway');
		res.json(giveaways);
	} catch (e) {
		next(e);
	}
};

exports.getTempPosms = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel.find({ user: temp.user, project: temp.project });

		let posms = await outletPosmModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('posm');
		res.json(posms);
	} catch (e) {
		next(e);
	}
};

exports.getTempProducts = async (req, res) => {
	try {
		temp = await tempModel.findById(req.params.id);
		visits = await visitModel.find({ user: temp.user, project: temp.project });
		let products = await outletSkuModel
			.find({ visit: { $in: visits.map((visit) => mongoose.Types.ObjectId(visit._id)) } })
			.populate('product');
		res.json(products);
	} catch (e) {
		next(e);
	}
};

exports.getTempById = async (req, res) => {
	try {
		temp = await tempModel
			.findById(req.params.id)
			.populate('project')
			.populate('user');
		res.json(temp);
	} catch (e) {
		next(e);
	}
};
