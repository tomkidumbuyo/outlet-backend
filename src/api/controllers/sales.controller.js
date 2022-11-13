const express = require('express');
const router = express.Router();
const saleModel = require('../models/sale.model');
const auth = require('../utils/auth');
const saleService = require('../services/sale.service');

exports.createSale = async (req, res) => {
	try {
		data = await saleService.create(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.updateSale = async (req, res) => {
	try {
		data = await saleService.update(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.deleteSale = async (req, res) => {
	try {
		data = await saleService.delete(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.getSales = async (req, res) => {
	try {
		sales = await saleModel.find({});
		res.json(sales);
	} catch (e) {
		next(e);
	}
};
