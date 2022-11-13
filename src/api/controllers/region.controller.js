const express = require('express');
const router = express.Router();
const regionModel = require('../models/region.model');
const auth = require('../utils/auth');

exports.creteRegion = async (req, res) => {
	try {
		region = await regionModel.create({
			name: req.body.name,
			region: req.body.region,
		});
		res.json(region);
	} catch (e) {
		next(e);
	}
};

exports.getAllRegions = async (req, res) => {
	regionModel.find({}, async (err, regions) => {
		if (e) {
			next(e);
			return;
		}
		res.json(regions);
	});
};

exports.getRegionById = async (req, res) => {
	try {
		region = await regionModel.findById(req.params.id);
		if (region) {
			res.json(region);
		} else {
			res.status(500).json({ error: 'No region with that id' });
		}
	} catch (e) {
		next(e);
	}
};

exports.deleteRegion = async (req, res) => {
	try {
		region = await regionModel.findById(req.params.id);
		region.delete();
		res.json({ status: success });
	} catch (e) {
		next(e);
	}
};
