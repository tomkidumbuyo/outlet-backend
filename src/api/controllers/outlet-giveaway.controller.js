const outletGiveawayService = require('../services/outletGiveaway.service');

exports.createOutletGiveaway = async (req, res) => {
	try {
		data = await outletGiveawayService.create(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.updateOutletGiveaway = async (req, res) => {
	try {
		data = await outletGiveawayService.update(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.deleteOutletGiveaway = async (req, res) => {
	try {
		data = await outletGiveawayService.delete(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};
