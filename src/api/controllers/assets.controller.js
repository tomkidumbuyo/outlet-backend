const express = require('express');

const router = express.Router();
const countries = require('i18n-iso-countries');
const userModel = require('../models/user.model');
const geojson = require('../utils/geojson');
const regionModel = require('../models/region.model');
const districtModel = require('../models/district.model');
const wardModel = require('../models/ward.model');

exports.getCountries = (req, res, next) => {
	res.json(countries.getNames('en'));
};

exports.getRegions = async (req, res, next) => {
	const regions = await regionModel.find({});
	res.json(regions);
};

exports.getDistricts = async (req, res, next) => {
	const districts = await districtModel.find({});
	res.json(districts);
};

exports.getWards = async (req, res, next) => {
	const wards = await wardModel.find({});
	res.json(wards);
};

// TODO: find out what this is for
exports.getGeoLocation = (req, res, next) => {
	const loc = geojson.getLocation(0, 0);
	res.json(loc);
};

exports.getAdminExists = async (req, res, next) => {
	try {
		const admin = await userModel.find({
			type: 'admin',
		});
		res.json(admin);
	} catch (error) {
		res.json({ status: false });
	}
};

exports.getWardsByLocations = async (req, res, next) => {
	const obj = await geojson.getWards(req.body.lat, req.body.lng);
	res.json(obj);
};
