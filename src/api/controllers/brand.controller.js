const brandModel = require('../models/brand.model');
const phoneModel = require('../models/phone.model');
const productModel = require('../models/product.model');

exports.createBrand = async (req, res, next) => {
	try {
		const phones = await phoneModel.insertMany(req.body.manager.phones);
		const brand = await brandModel.create({
			name: req.body.name,
			client: req.body.client,
			manager: {
				name: req.body.manager.name,
				phones,
				email: req.body.manager.email,
			},
		});
		res.json(brand);
	} catch (e) {
		next(e);
	}
};

exports.updateBrand = async (req, res, next) => {
	try {
		const phones = await phoneModel.insertMany(req.body.manager.phones);
		const brand = await brandModel.findById(req.params.brandId);
		brand.name = req.body.name;
		brand.manager = {
			name: req.body.manager.name,
			phones,
			email: req.body.manager.email,
		};
		brand.save();
		res.json(brand);
	} catch (e) {
		next(e);
	}
};

exports.getAllBrands = async (req, res, next) => {
	try {
		const brands = await brandModel.find({});
		res.json(brands);
	} catch (e) {
		next(e);
	}
};

exports.getBrandProducts = async (req, res, next) => {
	try {
		const products = await productModel
			.find({ brand: req.params.brandId })
			.populate('classifications')
			.populate({ path: 'brand', populate: 'client' })
			.populate('skus');
		res.json(products);
	} catch (e) {
		next(e);
	}
};

exports.getBrandById = async (req, res, next) => {
	try {
		const brand = await brandModel.findById(req.params.brandId).populate('manager.phones');
		res.json(brand);
	} catch (e) {
		next(e);
	}
};
