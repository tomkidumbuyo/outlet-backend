const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const productModel = require('../models/product.model');
const skuModel = require('../models/sku.model');

exports.createProduct = async (req, res) => {
	try {
		product = await productModel.create({
			name: req.body.name,
			classifications: req.body.classifications.map((classification) => classification._id),
			brand: req.body.brand,
		});

		sskus = req.body.skus.map((skuu) => {
			return { sku: skuu.sku, price: skuu.price, product: product._id };
		});
		product.skus = await skuModel.insertMany(sskus);
		await product.save();
		res.json(product);
	} catch (e) {
		next(e);
	}
};

exports.getProductById = async (req, res) => {
	try {
		product = await productModel
			.findById(req.params.id)
			.populate({ path: 'classifications' })
			.populate({ path: 'brand', child: { path: 'client' } });
		skus = await skuModel.find({ _id: { $in: product.skus } });
		product = product.toObject();
		product.skus = skus;
		res.json(product);
	} catch (e) {
		next(e);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		product = await productModel.findById(req.params.id);
		(product.name = req.body.name),
			(product.classifications = req.body.classifications),
			(product.brand = req.body.brand),
			(product.edited = Date.now());
		await product.save();

		sskus = await skuModel.find({ product: product });
		for (const skuu of sskus) {
			skuu.delete();
		}
		sskus = [];
		for (const skuu of req.body.skus) {
			sk = await skuModel.create({
				sku: skuu.sku,
				price: skuu.price,
				product: product,
			});
			sskus.push(sk);
		}

		product.skus = sskus;
		await product.save();
		product = await productModel.findById(req.params.id);
		res.json(product);
	} catch (e) {
		next(e);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		product = await productModel.findById(req.params.id);
		await product.delete();
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

exports.pagination = async (req, res) => {
	try {
		products = await productModel
			.find()
			.sort(req.params.sort ? req.params.sort : 'name')
			.skip(req.params.offset ? parseInt(req.params.offset) : 0)
			.limit(parseInt(req.params.limit));
		res.json(products);
	} catch (e) {
		next(e);
	}
};

exports.productsCount = async (req, res, next) => {
	products = await productModel.countDocuments({}, (err, count) => {
		if (err) {
			next(e);
		}
		res.json({ count: count });
	});
};

exports.getAllProducts = async (req, res) => {
	try {
		products = await productModel
			.find({})
			.populate({ path: 'brand', populate: { path: 'client' } })
			.populate('skus')
			.populate('classifications')
			.sort('name');
		res.json(products);
	} catch (e) {
		next(e);
	}
};
