const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');
const posmModel = require('../models/posm.model');

exports.createPosm = async (req, res) => {
	try {
		posm = await posmModel.create({
			name: req.body.name,
		});
		res.json(posm);
	} catch (e) {
		next(e);
	}
};

exports.deletePosm = async (req, res) => {
	try {
		posm = await posmModel.findById(req.params.id);
		posm.delete();
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

exports.getPosmById = async (req, res) => {
	try {
		posm = await posmModel.findById(req.params.id);
		res.json(posm);
	} catch (e) {
		next(e);
	}
};

exports.updatePosm = async (req, res) => {
	try {
		posm = await posmModel.findById(req.params.id);
		posm.name = req.body.name;
		posm.save();
		res.json(posm);
	} catch (e) {
		next(e);
	}
};

exports.getPosms = async (req, res) => {
	try {
		posms = await posmModel.find({});
		res.json(posms);
	} catch (e) {
		next(e);
	}
};
