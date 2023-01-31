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
	} catch (error) {
		next(error);
	}
};

exports.getAllRegions = async (req, res) => {
	regionModel.find({}, async (error, regions) => {
		if (error) {
			next(error);
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
	} catch (error) {
		next(error);
	}
};

exports.deleteRegion = async (req, res) => {
	try {
		region = await regionModel.findById(req.params.id);
		region.delete();
		res.json({ status: success });
	} catch (error) {
		next(error);
	}
};
