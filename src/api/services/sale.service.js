const mongoose = require('mongoose');
const saleModel = require('../models/sale');
const outletModel = require('../models/outlet');
const saleItemModel = require('../models/saleItem');
const visitLibrary = require('../utils/visit');
const skuModel = require('../models/sku');

module.exports.create = async function create(data, user) {
	return new Promise(async (resolve, reject) => {
		sale = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			sale = await saleModel.findById(data._id);
		} else {
			sale = await saleModel.findOne({ tempId: data._id });
		}

		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		if (sale == null && outlet != null) {
			visit = await visitLibrary.get(user, outlet);

			try {
				sale = await saleModel.create({
					tempId: data._id,
					order: data.order,
					outlet: outlet,
					visit: visit,
					user: user,
					project: user.project,
					date: Date(data.time),
				});

				for (const item of data.items) {
					sku = await skuModel.findById(item.sku);
					saleItem = await saleItemModel.create({
						tempId: item._id,
						sku: item.sku,
						amount: item.amount,
						sale: sale,
						priceEach: sku.price,
					});
					if (sale.items.length > 0) {
						sale.items = [saleItem];
					} else {
						sale.items.push(saleItem);
					}
				}
				await sale.save();

				// firebase.upstream(SALE_TABLE, actions.CREATE, sale.toObject());
				resolve(data);
			} catch (error) {
				reject(error);
			}
		} else if (outlet != null) {
			module.exports
				.update(data, user)
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});
			resolve(a);
		} else {
			a = await create(data, user);
			resolve(a);
		}
	});
};

module.exports.update = async function update(data, user) {
	return new Promise(async (resolve, reject) => {
		sale = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			sale = await saleModel.findById(data._id);
		} else {
			sale = await saleModel.findOne({ tempId: data._id });
		}

		outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		if (sale != null) {
			try {
				sale.outlet = outlet;
				sale.order = data.order;
				sale.user = user;
				sale.project = user.project;

				sale.delivered = data.delivered;
				sale.canceled = data.canceled;
				sale.deliveryDate = data.deliveryDate;

				// firebase.upstream(SALE_TABLE, actions.UPDATE, sale.toObject());

				await saleItemModel.deleteMany({ sale: sale });
				sale.items = [];

				for (const item of data.items) {
					sku = await skuModel.findById(item.sku);
					saleItem = await saleItemModel.create({
						tempId: item._id,
						sku: item.sku,
						amount: item.amount,
						sale: sale,
						priceEach: sku.price,
					});

					sale.items.push(saleItem);
				}

				sale.save();
				resolve(data);
			} catch (error) {
				reject(error);
			}
		} else {
			reject('sale not found');
		}
	});
};

module.exports.remove = async function remove(data, user) {
	return new Promise(async (resolve, reject) => {
		sale = null;
		if (mongoose.Types.ObjectId.isValid(data._id)) {
			sale = await saleModel.findById(data._id);
		} else {
			sale = await saleModel.findOne({ tempId: data._id });
		}
		if (sale != null) {
			try {
				saleItems = await saleItemModel.find({ sale: sale });
				for (const salesItem of saleItems) {
					await salesItem.delete();
				}
				await sale.delete();
				resolve(sale);
			} catch (error) {
				reject(error);
			}
		} else {
			reject('sale not found');
		}
		// firebase.upstream(SALE_TABLE, actions.DELETE, sale);
	});
};
