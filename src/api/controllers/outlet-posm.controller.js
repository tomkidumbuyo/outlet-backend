const outletPosmService = require('../services/outletPosm.service');

exports.createOutletPosm = async (req, res) => {
	try {
		data = await outletPosmService.create(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.updateOutletPosm = async (req, res) => {
	try {
		data = await outletPosmService.update(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

exports.deleteOutletPosm = async (req, res) => {
	try {
		data = await outletPosmService.delete(req.body, req.user);
		res.json(data);
	} catch (e) {
		next(e);
	}
};

module.exports = router;
