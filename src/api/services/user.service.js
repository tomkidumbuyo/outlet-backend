const mongoose = require('mongoose');
const userLocationModel = require('../models/user-location.model');
const geojson = require('../utils/geojson');

module.exports.ping = async function ping(data, user) {
	return new Promise(async (resolve, reject) => {
		try {
			if (data.lat != 0.0 && data.lng != 0.0) {
				thetime = new Date(data.time);
				hoursago = new Date(thetime.getTime() - 1000 * 60 * 60 * 2);
				hourslater = new Date(thetime.getTime() + 1000 * 60 * 60 * 2);

				userLocation = await userLocationModel.findOne({
					lat: data.lat,
					lng: data.lng,
					user: user._id,
					toTime: {
						$lte: hourslater,
						$gte: hoursago,
					},
				});

				if (userLocation) {
					userLocation.toTime = thetime;
					await userLocation.save();
					resolve(userLocation);
				} else {
					loc = await geojson.getLocation(data.lat, data.lng);
					userLocation = await userLocationModel.create({
						lat: data.lat,
						lng: data.lng,
						user: user._id,
						ward: loc.ward,
						district: loc.district,
						region: loc.region,
						time: thetime,
						toTime: thetime,
					});
					resolve(userLocation);
				}
			} else {
				resolve(data);
			}
		} catch (err) {
			reject(err);
			console.log('Firebase insertion error: ', err);
		}
	});
};
