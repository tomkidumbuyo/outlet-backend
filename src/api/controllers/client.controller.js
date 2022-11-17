const clientModel = require('../models/client.model');
const phoneModel = require('../models/phone.model');
const brandModel = require('../models/brand.model');
const projectModel = require('../models/project.model');
const userModel = require('../models/user.model');

exports.createClient = async (req, res, next) => {
	try {
		const phones = await phoneModel.insertMany(req.body.manager.phones);
		const client = await clientModel.create({
			name: req.body.name,
			classification: req.body.classification,
			phones,
			website: req.body.website,
			address: req.body.address,
			email: req.body.email,
		});
		res.json(client);
	} catch (e) {
		next(e);
	}
};

exports.getClients = async (req, res, next) => {
	try {
		const clients = await clientModel.find({}).populate('phones');
		res.json(clients);
	} catch (e) {
		next(e);
	}
};

// TODO: find out what these functions do.
exports.addPhoneNumberToClient = async (req, res, next) => {
	try {
		const client = await clientModel.findById(req.params.clientId).populate('phones');
		client.save();
		res.json(client);
	} catch (e) {
		next(e);
	}
};

exports.removePhoneNumberToClient = async (req, res, next) => {
	try {
		const client = await clientModel.findById(req.params.clientId).populate('phones');
		client.save();
		res.json(client);
	} catch (e) {
		next(e);
	}
};

exports.getClientBrands = async (req, res, next) => {
	try {
		const brands = await brandModel.find({ client: req.params.clientId });
		res.json(brands);
	} catch (e) {
		next(e);
	}
};

exports.getClientProjects = async (req, res, next) => {
	try {
		const projects = await projectModel.find({ client: req.params.clientId });
		res.json(projects);
	} catch (e) {
		next(e);
	}
};

exports.updateClient = async (req, res, next) => {
	try {
		const client = await clientModel.findById(req.params.clientId);
		const phones = await phoneModel.insertMany(req.body.manager.phones);
		client.name = req.body.name;
		client.classification = req.body.classification;
		client.phones = phones;
		client.website = req.body.website;
		client.address = req.body.address;
		client.email = req.body.email;
		client.save();
		res.json(client);
	} catch (e) {
		next(e);
	}
};

exports.getClientById = async (req, res, next) => {
	try {
		const clients = await clientModel.findById(req.params.clientId).populate('phones');
		res.json(clients);
	} catch (e) {
		next(e);
	}
};

exports.getClientUsers = async (req, res, next) => {
	try {
		const users = await userModel.find({ client: req.params.clientId });
		res.json(users);
	} catch (e) {
		next(e);
	}
};

exports.deleteClient = async (req, res, next) => {
	try {
		const client = await clientModel.findById(req.params.clientId);
		await brandModel.deleteMany({ client });
		await projectModel.deleteMany({ client });
		await clientModel.findByIdAndDelete(req.params.clientId);
		res.json({
			status: 'success',
		});
	} catch (e) {
		next(e);
	}
};
