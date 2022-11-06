const outletModel = require('../models/outlet');
const visitLibrary = require('../utils/visit');
const outletGiveawayModel = require('../models/outletGiveaway');
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

			outletGiveaway = await outletGiveawayModel.findOne({ giveaway: data.giveaway, visit: visit });

			if (!outletGiveaway) {
				try {
					outletGiveaway = await outletGiveawayModel.create({
						tempId: data._id,
						giveaway: data.giveaway,
						outlet: outlet,
						amount: data.amount,
						visit: visit,
					});
					upstream(OUTLET_GIVEAWAY_TABLE, actions.CREATE, outletGiveaway.toObject());
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
			reject('Waiting for an outlet to be synced.');
		}
	});
};

module.exports.update = async function update(data, user) {
	return new Promise(async (resolve, reject) => {
		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		visit = await visitLibrary.get(user, outlet);
		outletGiveaway = await outletGiveawayModel.findOne({ giveaway: data.giveaway, visit: visit });

		if (outletGiveaway != null) {
			try {
				outletGiveaway.amount = data.amount;
				outletGiveaway.save();
				// firebase.upstream(OUTLET_GIVEAWAY_TABLE, actions.UPDATE, outlet.toObject());
				resolve(outletGiveaway);
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
		outletGiveaway = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outletGiveaway = await outletModel.findById(data._id);
		} else {
			outletGiveaway = await outletModel.findOne({ tempId: data._id });
		}
		if (outletGiveaway != null) {
			outletGiveaway.delete();
			// firebase.upstream(OUTLET_GIVEAWAY_TABLE, actions.DELETE, outlet.toObject());
			resolve(outlet);
		} else {
			reject('Outlet classification not available.');
		}
	});
};
