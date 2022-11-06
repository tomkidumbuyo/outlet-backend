const giveawayModel = require('../models/giveaway.model');

exports.createGiveaway = async (req, res, next) => {
	try {
		const giveaway = await giveawayModel.create({
			name: req.body.name,
		});
		res.json(giveaway);
	} catch (e) {
		next(e);
	}
};

exports.deleteGiveaway = async (req, res, next) => {
	try {
		const giveaway = await giveawayModel.findById(req.params.id);
		giveaway.delete();
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};

exports.getGiveawayById = async (req, res, next) => {
	try {
		const giveaway = await giveawayModel.findById(req.params.id);
		res.json(giveaway);
	} catch (e) {
		next(e);
	}
};

exports.updateGiveaway = async (req, res, next) => {
	try {
		const giveaway = await giveawayModel.findById(req.params.id);
		giveaway.name = req.body.name;
		giveaway.save();
		res.json(giveaway);
	} catch (e) {
		next(e);
	}
};

exports.getAllGiveaways = async (req, res, next) => {
	try {
		const giveaways = await giveawayModel.find({});
		res.json(giveaways);
	} catch (e) {
		next(e);
	}
};
