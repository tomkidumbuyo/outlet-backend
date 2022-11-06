const fileService = require('../services/file.service');

// Tutorial url
// https://attacomsian.com/blog/uploading-files-nodejs-express#
exports.saveImage = async (req, res, next) => {
	try {
		const data = await fileService.create(req.body, req.user);
		res.json({ status: 'success', data });
	} catch (e) {
		next(e);
	}
};

exports.deleteImage = async (req, res, next) => {
	try {
		await fileService.remove(req.body, req.user);
		res.json({ status: 'success' });
	} catch (e) {
		next(e);
	}
};
