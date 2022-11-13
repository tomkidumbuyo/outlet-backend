const outletModel = require('../models/outlet.model');
const visitLibrary = require('../utils/visit');
const outletProductModel = require('../models/outlet-product.model');
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
			outletProduct = await outletProductModel.findOne({ product: data.product, visit: visit });
			if (!outletProduct) {
				try {
					outletProduct = await outletProductModel.create({
						tempId: data._id,
						product: data.product,
						project: user.project,
						user: user,
						outlet: outlet,
						posms: data.posms,
						visit: visit,
					});
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
			reject('Waiting for an outlet.');
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
		outletProduct = await outletProductModel.findOne({ product: data.product, visit: visit });

		if (outletProduct != null) {
			try {
				(outletProduct.posms = data.posms), outletProduct.save();
				resolve(outletProduct);
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
		outletProduct = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outletProduct = await outletModel.findById(data._id);
		} else {
			outletProduct = await outletModel.findOne({ tempId: data._id });
		}
		if (outletProduct != null) {
			outletProduct.delete();
			// firebase.upstream(OUTLET_SKU_TABLE, actions.DELETE, outlet.toObject());
			resolve(outlet);
		} else {
			reject('Outlet classification not available.');
		}
	});
};
