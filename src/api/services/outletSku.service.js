const outletModel = require('../models/outlet');
const visitLibrary = require('../utils/visit');
const outletSkuModel = require('../models/outletSku');
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
			outletSku = await outletSkuModel.findOne({ sku: data.sku, visit: visit });
			if (!outletSku) {
				try {
					if (data.price == 0) {
						sku = await skuModel.findById(data.sku);
						data.price = sku.price;
					}

					outletSku = await outletSkuModel.create({
						tempId: data._id,
						sku: data.sku,
						outlet: outlet,
						stock: data.stock,
						price: data.price,
						visibility: data.visibility,
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
		outletSku = await outletSkuModel.findOne({ sku: data.sku, visit: visit });

		if (outletSku != null) {
			try {
				if (data.price == 0) {
					outletSku.price = data.price;
				}

				outletSku.stock = data.stock;
				outletSku.visibility = data.visibility;
				outletSku.price = data.price;
				outletSku.save();
				// firebase.upstream(OUTLET_SKU_TABLE, actions.UPDATE, outlet.toObject());
				resolve(outletSku);
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
		outletSku = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			outletSku = await outletModel.findById(data._id);
		} else {
			outletSku = await outletModel.findOne({ tempId: data._id });
		}
		if (outletSku != null) {
			outletSku.delete();
			// firebase.upstream(OUTLET_SKU_TABLE, actions.DELETE, outlet.toObject());
			resolve(outlet);
		} else {
			reject('Outlet classification not available.');
		}
	});
};
