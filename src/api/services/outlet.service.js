const outletModel = require('../models/outlet.model');
const mongoose = require('mongoose');
const geojson = require('../utils/geojson');
const outletAttributeModel = require('../models/outlet-attribute.model');

module.exports.create = async function create(data, user) {
	return new Promise(async (resolve, reject) => {
		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outlet = await outletModel.findById(data._id);
		} else {
			outlet = await outletModel.findOne({ tempId: data._id });
		}

		if (outlet == null) {
			try {
				loc = await geojson.getLocation(data.latlng.lat, data.latlng.lng);

				outlet = await outletModel.create({
					tempId: data._id,
					latlng: {
						lat: data.latlng.lat,
						lng: data.latlng.lng,
					},
					location: [parseFloat(data.latlng.lng), parseFloat(data.latlng.lat)],
					tin: data.tin,
					user: user,
					brn: data.brn,
					phone: data.phone,
					countryCode: data.countryCode,
					name: data.name,
					owner: data.owner,
					images: data.images,
					classifications: data.classifications.map((classification) => classification._id),
					project: user.project,
					ward: loc.ward,
					district: loc.district,
					region: loc.region,
					created: Date(data.time),
				});
				outlet = await outlet.populate('classifications');

				for (const attribute of data.attributes) {
					outletAttribute = await outletAttributeModel.create({
						outlet: outlet,
						attribute: attribute.attribute,
						number: attribute.number,
						bool: attribute.bool,
						string: attribute.string,
					});
				}
				resolve(data);
			} catch (error) {
				reject(error);
			}
		} else {
			module.exports
				.update(data, user)
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		}
	});
};

module.exports.update = async function update(data, user) {
	return new Promise(async (resolve, reject) => {
		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outlet = await outletModel.findById(data._id);
		} else {
			outlet = await outletModel.findOne({ tempId: data._id });
		}

		if (outlet != null) {
			try {
				outlet.latlng = {
					lat: data.latlng.lat,
					lng: data.latlng.lng,
				};
				location: [parseFloat(data.latlng.lng), parseFloat(data.latlng.lat)], (outlet.tin = data.tin);
				outlet.brn = data.brn;
				outlet.phone = data.phone;
				outlet.countryCode = data.countryCode;
				outlet.name = data.name;
				outlet.owner = data.owner;
				outlet.images = data.images;
				(outlet.classifications = data.classifications.map((classification) => classification._id)),
					(outlet.updated = Date(data.time));
				loc = await geojson.getLocation(outlet.latlng.lat, outlet.latlng.lng);
				outlet.ward = loc.ward;
				outlet.district = loc.district;
				outlet.region = loc.region;
				outlet.save();

				// firebase.upstream(OUTLET_TABLE, actions.UPDATE, outlet.toObject());
				resolve(data);
			} catch (error) {
				reject(error);
			}
		} else {
			module.exports
				.create(data, user)
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
		}
	});
};

module.exports.remove = async function remove(data, user) {
	return new Promise(async (resolve, reject) => {
		try {
			outlet = await outletModel.findById(data._id);
			if (outlet != null) {
				outlet.delete();
				resolve(outlet);
			}
		} catch (error) {
			console.log('error', error);
		}
		// firebase.upstream(OUTLET_TABLE, actions.DELETE, outlet);
	});
};
