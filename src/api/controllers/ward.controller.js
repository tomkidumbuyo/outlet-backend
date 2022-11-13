const express = require('express');
const router = express.Router();
const wardModel = require('../models/ward.model');
const auth = require('../utils/auth');

exports.createWard = async (req, res) => {
	try {
		ward = await wardModel.create({
			name: req.body.name,
			ward: req.body.ward,
		});
		res.json(ward);
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

exports.getWards = async (req, res) => {
	wardModel.find({}, async (err, wards) => {
		if (err) {
			res.status(500).json({ error: err });
			return;
		}
		res.json(wards);
	});
};

exports.getWardById = async (req, res) => {
	try {
		ward = await wardModel.findById(req.params.id);
		if (ward) {
			res.json(ward);
		} else {
			res.status(500).json({ error: 'No ward with that id' });
		}
	} catch (e) {
		next(e);
	}
};

exports.deleteWard = async (req, res) => {
	try {
		ward = await wardModel.findById(req.params.id);
		ward.delete();
		res.json({ status: success });
	} catch (e) {
		next(e);
	}
};
