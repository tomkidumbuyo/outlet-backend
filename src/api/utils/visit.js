const visitModel = require('../models/visit.model');

async function create(user, outlet) {
	return new Promise(async (resolve, reject) => {
		visit = await visitModel.create({
			//query today up to tonight
			date: new Date(),
			user: user,
			project: user.project,
			outlet: outlet,
		});
		resolve(visit);
	});
}

async function get(user, outlet) {
	return new Promise(async (resolve, reject) => {
		var start = new Date();
		start.setHours(0, 0, 0, 0);

		var end = new Date();
		end.setDate(end.getDate() + 1);

		visit = await visitModel.findOne({
			//query today up to tonight
			date: {
				$gte: start,
				$lt: end,
			},
			project: user.project,
			user: user,
			outlet: outlet,
		});

		if (visit) {
			resolve(visit);
		} else {
			visit = await create(user, outlet);
			resolve(visit);
		}
	});
}

async function hasVisit(user, outlet) {
	return new Promise(async (resolve, reject) => {
		visit = await visitModel.find({
			//query today up to tonight
			project: user.project,
			user: user,
			outlet: outlet,
		});
		if (visit) {
			resolve(true);
		} else {
			resolve(false);
		}
	});
}

async function allVisits(user, outlet) {
	return new Promise(async (resolve, reject) => {
		visits = await visitModel.find({
			//query today up to tonight
			project: user.project,
			user: user,
			outlet: outlet,
		});
		if (visit) {
			resolve(visits);
		} else {
			resolve([]);
		}
	});
}

async function userTodayVisits(user) {
	return new Promise(async (resolve, reject) => {
		var start = new Date();
		start.setHours(0, 0, 0, 0);

		var end = new Date();
		end.setDate(end.getDate() + 1);

		visits = await visitModel.find({
			//query today up to tonight
			date: {
				$gte: start,
				$lt: end,
			},
			project: user.project,
			user: user,
		});
		resolve(visits);
	});
}

module.exports = {
	create: create,
	get: get,
	userTodayVisits: userTodayVisits,
	hasVisit: hasVisit,
	allVisits: allVisits,
};
