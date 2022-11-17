const districtModel = require('../models/district.model');

exports.createDistrict = async (req, res) => {
	try {
		district = await districtModel.create({
			name: req.body.name,
			region: req.body.region,
		});
		res.json(district);
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

exports.getAllDistricts = async (req, res) => {
	districtModel.find({}, async (err, districts) => {
		if (err) {
			res.status(500).json({ error: err });
			return;
		}
		res.json(districts);
	});
};

exports.getDistrictById = async (req, res) => {
	try {
		district = await districtModel.findById(req.params.id);
		if (district) {
			res.json(district);
		} else {
			res.status(500).json({ error: 'No district with that id' });
		}
	} catch (e) {
		next(e);
	}
};

exports.deleteDistrict = async (req, res) => {
	try {
		district = await districtModel.findById(req.params.id);
		district.delete();
		res.json({ status: success });
	} catch (e) {
		next(e);
	}
};
