const fs = require('fs');
const AWS = require('aws-sdk');

ID = process.env.AWSAccessKeyId;
SECRET = process.env.AWSSecretKey;
BUCKET_NAME = 'amplifyimages';

const s3 = new AWS.S3({
	accessKeyId: ID,
	secretAccessKey: SECRET,
});

const uploadFile = (fileName) => {
	return new Promise(async (resolve, reject) => {
		const fileContent = fs.readFileSync(fileName);

		// Setting up S3 upload parameters
		const params = {
			Bucket: BUCKET_NAME,
			Key: fileName, // File name you want to save as in S3
			Body: fileContent,
		};

		// Uploading files to the bucket
		s3.upload(params, function(err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
};

const deleteFile = (fileName) => {
	return new Promise(async (resolve, reject) => {
		// Setting up S3 delete parameters
		const params = {
			Bucket: BUCKET_NAME,
			Key: fileName, // File name you want to save as in S3
		};

		// Uploading files to the bucket
		s3.deleteObject(params, function(err, data) {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
};

module.exports = {
	upload: uploadFile,
	delete: deleteFile,
};
