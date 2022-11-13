const express = require('express');
const router = express.Router();
const randomColor = require('randomcolor');
const classificationModel = require('../models/classification.model');
const classificationAttributeModel = require('../models/classification-attribute.model');
const categoryModel = require('../models/category.model');

exports.getNestedClassifications = async (req, res, next) => {
	try {
		classification = await classificationModel.find({
			category: null,
		});
		for (const classification of classification) {
			classification.categories = await loadCategories(classification);
		}

		res.json(classification ? classification : []);
	} catch (e) {
		next(e);
	}
};

async function loadCategories(classification) {
	categories = await categoryModel.find({
		classification: classification,
	});
	if (categories && categories.length()) {
		classification.categories = categories;
		for await (const category of classification.categories) {
			category.classification = await loadclassificationes(category);
		}
	}
	return categories;
}

async function loadclassificationes(category) {
	classification = await classificationModel.find({
		category: category,
	});

	if (classification && classification.length()) {
		for await (const classification of classification) {
			classification.categories = await loadCategories(classification);
		}
	}
}

exports.getCategories = async (req, res, next) => {
	try {
		categories = (await categoryModel.find({})) || [];
		res.json(categories);
	} catch (e) {
		next(e);
	}
};

exports.getOutletCategories = async (req, res, next) => {
	try {
		categories = await categoryModel.find({ for: 'outlet' });
		if (categories == null) {
			categories = [];
		}
		res.json(categories);
	} catch (e) {
		next(e);
	}
};

exports.getClassifications = async (req, res, next) => {
	try {
		classifications = await classificationModel.find({}).populate('attributes');
		if (classifications == null) {
			classifications = [];
		}
		for (const classification of classifications) {
			if (classification.color == null || classification.color == undefined) {
				classification.color = randomColor();
				await classification.save();
			}
		}
		res.json(classifications);
	} catch (e) {
		next(e);
	}
};

exports.getOutletClassifications = async (req, res, next) => {
	try {
		classification = await classificationModel.find({ for: 'outlet' }).populate('attributes');
		if (classification == null) {
			classification = [];
		}
		res.json(classification);
	} catch (e) {
		next(e);
	}
};

exports.createCategory = async (req, res, next) => {
	try {
		category = await categoryModel.create({
			name: req.body.name,
			classification: req.body.classification,
			for: req.body.for,
		});
		res.json(category);
	} catch (e) {
		next(e);
	}
};

exports.createClassification = async (req, res, next) => {
	category = req.body.category == '' ? null : req.body.category;
	try {
		classification = await classificationModel.create({
			name: req.body.name,
			category: category,
			for: req.body.for,
			color: randomColor(),
		});
		res.json(classification);
	} catch (e) {
		next(e);
	}
};

exports.getClassificationById = async (req, res, next) => {
	try {
		classification = await classificationModel.findById(req.params.id);
		res.json(classification);
	} catch (e) {
		next(e);
	}
};

exports.getCategoryById = async (req, res, next) => {
	try {
		category = await categoryModel.findById(req.params.id);
		res.json(category);
	} catch (e) {
		next(e);
	}
};

exports.updateClassificationById = async (req, res, next) => {
	try {
		classification = await classificationModel.findById(req.params.id).populate('attributes');
		for (const attribute of classification.attributes) {
			// check if the attributes in databsse are in the post requests to verify if they are not deleted and also add the newsly added attributes
			deleted = true;
			for (const attr of req.body.attributes) {
				if (attr.name) {
					if (attribute._id.equals(attr._id)) {
						deleted = false;
					}
				} else {
					if (attribute._id.equals(attr)) {
						deleted = false;
					}
				}
			}
			if (deleted == true) {
				classification.attributes.splice(classification.attributes.indexOf(attribute));
				atr = await classificationAttributeModel.findById(attribute._id);
				await atr.delete();
			}
		}

		attrs = await classificationAttributeModel.find({ classification: classification._id });
		for (const attr of attrs) {
			deleted = true;
			for (const attribute of classification.attributes) {
				if (attribute._id.equals(attr._id)) {
					deleted = false;
				}
			}
			if (deleted == true) {
				await attr.delete();
			}
		}

		for (const attr of req.body.attributes) {
			if (!attr._id) {
				// if post attribute does not ahve an _id then save the attribute and add it to classificatio
				newAttribute = await classificationAttributeModel.create({
					name: attr.name,
					type: attr.type,
					unit: attr.unit,
					classification: classification._id,
				});
				classification.attributes.push(newAttribute);
			}
		}

		await classification.save();
		await classification.populate('attributes');
		res.json(classification);
	} catch (e) {
		next(e);
	}
};

exports.deleteClassificationById = async (req, res, next) => {
	try {
		classification = await classificationModel.findById(req.params.id);
		classification.delete();
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

exports.deleteCategoryById = async (req, res, next) => {
	try {
		category = await categoryModel.findById(req.params.id);
		category.delete();
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

exports.addAttribute = async (req, res, next) => {
	try {
		classification = await classificationModel.findById(req.params.classificationId);
		classificationAttribute = await classificationAttributeModel.create({});
		classification.attributes.push(classificationAttribute);
		classification.save();
		res.json(classification);
	} catch (e) {
		next(e);
	}
};

exports.getAttributes = async (req, res, next) => {
	try {
		classificationAttributes = await classificationAttributeModel.find({});
		res.json(classificationAttributes);
	} catch (e) {
		next(e);
	}
};
