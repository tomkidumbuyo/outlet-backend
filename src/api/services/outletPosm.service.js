const outletModel = require('../models/outlet.model');
const visitLibrary = require('../utils/visit');
const outletPosmModel = require('../models/outlet-posm.model');
const mongoose = require('mongoose');

module.exports.create = async function create(data, user) {
	return new Promise(async (resolve, reject) => {
		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		if (outlet != null) {
			visit = await visitLibrary.get(user, outlet);
			outletPosm = await outletPosmModel.findOne({ posm: data.posm, visit: visit });

			if (!outletPosm) {
				try {
					outletPosm = await outletPosmModel.create({
						tempId: data._id,
						posm: data.posm,
						outlet: outlet,
						added: data.added,
						removed: data.removed,
						visit: visit,
					});
					// firebase.upstream(OUTLET_POSM_TABLE, actions.CREATE, outletPosm.toObject());
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
		} else {
			reject('Waiting for the outlet to be added.');
		}
	});
};

module.exports.update = async function update(data, user) {
	return new Promise(async (resolve, reject) => {
		visit = await visitLibrary.get(user, outlet);
		outletPosm = await outletPosmModel.findOne({ posm: data.posm, visit: visit });

		if (outletPosm != null) {
			try {
				outletPosm.added = data.added;
				outletPosm.removed = data.removed;
				outletPosm.save();
				// firebase.upstream(OUTLET_POSM_TABLE, actions.UPDATE, outlet.toObject());
				resolve(outletPosm);
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
		outletPosm = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outletPosm = await outletModel.findById(data._id);
		} else {
			outletPosm = await outletModel.findOne({ tempId: data._id });
		}
		if (outletPosm != null) {
			outletPosm.delete();
			// firebase.upstream(OUTLET_POSM_TABLE, actions.DELETE, outlet.toObject());

			resolve(outlet);
		} else {
			reject('Outlet classification not available.');
		}
	});
};
