const outletModel = require('../models/outlet');
const mongoose = require('mongoose');
const fs = require('fs');
const visitLibrary = require('../utils/visit');
const s3 = require('../utils/s3');

module.exports.create = async function create(data, user) {
	return new Promise(async (resolve, reject) => {
		let outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		visit = await visitLibrary.get(user, outlet);
		if (visit.images.indexOf(data.name) == -1) {
			visit.images.push(data.name);
			await visit.save();
		}

		if (data.type == 'POSMAFTER') {
			if (visit.posmAfterImages.indexOf(data.name) == -1) {
				visit.posmAfterImages.push(data.name);
				await visit.save();
			}
			resolve(data);
			return;
		} else if (data.type == 'POSMBEFORE') {
			if (visit.posmBeforeImages.indexOf(data.name) == -1) {
				visit.posmBeforeImages.push(data.name);
				await visit.save();
			}
			resolve('files/' + data.name);
			return;
		} else {
			if (outlet && outlet.images.indexOf(data.name) == -1) {
				outlet.images.push(data.name);
				await outlet.save();
			}
			resolve('files/' + data.name);
			return;
		}
		reject('files/' + data.name);
	});
};

module.exports.remove = async function remove(data, user) {
	return new Promise(async (resolve, reject) => {
		// PersonModel.find({ favouriteFoods: "sushi" })
		let outlet = null;
		if (mongoose.Types.ObjectId.isValid(data.outlet)) {
			outlet = await outletModel.findById(data.outlet);
		} else {
			outlet = await outletModel.findOne({ tempId: data.outlet });
		}

		if (outlet != null) {
			if (outlet.images.indexOf(data.name) >= 0) {
				outlet.images.splice(outlet.images.indexOf(data.name), 1);
				await outlet.save();
			}

			visit = await visitLibrary.get(user, outlet);

			if (visit.images.indexOf(data.name) >= 0) {
				visit.images.splice(visit.images.indexOf(data.name), 1);
				await visit.save();
			}

			if (visit.posmAfterImages.indexOf(data.name) >= 0) {
				visit.posmAfterImages.splice(visit.posmAfterImages.indexOf(data.name), 1);
				await visit.save();
			}

			if (visit.posmBeforeImages.indexOf(data.name) >= 0) {
				visit.posmBeforeImages.splice(visit.posmBeforeImages.indexOf(data.name), 1);
				await visit.save();
			}

			try {
				s3.delete('files/' + data.name);

				//fs.unlinkSync('files/' + data.name)
				resolve(data);
			} catch (err) {
				console.error(err);
				reject({ status: 'error', error: err });
			}
		} else {
			reject({ status: 'pending', error: 'Outlet not yet inserted.' });
		}
	});
};
