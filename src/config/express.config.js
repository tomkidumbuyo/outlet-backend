const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const tmp = require('tmp');

const { logs } = require('../constants');

const bodyParser = require('body-parser');
const session = require('./session.config');
const cors = require('./cors.config');
const clientLogs = require('./client-log.config');

const routes = require('../api/routes/v1');
const error = require('../api/middleware/error');

/**
 * Express instance
 * @public
 */
const app = express();

const dynamoose = require('dynamoose');
const AWS = require('aws-sdk');

// DynamoDB connection instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
	"credentials": {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
	region: process.env.AWS_REGION,
});
dynamoose.aws.ddb.set(ddb);
dynamoose.Table.defaults.set({
	create: true,
	update: true,
	waitForActive: {
			enabled: true,
			check: {
					timeout: 180000, // 3 minutes
					frequency: 5000, // Every 5 seconds
			},
	},
});


// TODO: Include CSRF middlewares here

// request logging. dev: console | production: file
app.use(morgan(logs));

// This middleware take care of the origin when the origin is undefined.
// origin is undefined when request is local
app.use((req, _, next) => {
	req.headers.origin = req.headers.origin || req.headers.host;
	next();
});

// CORS configuration
var allowlist = [process.env.FRONTEND_URL];
app.use(
	cors({
		origin: allowlist,
	})
);
console.log(allowlist);

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

/**
 * App Configurations
 */

// session configuration
app.use(session());

// mount api v1 routes
app.use('/api/v1', routes);
app.use('/api/client-log', clientLogs);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// temporary files created using tmp will be deleted on UncaughtException
tmp.setGracefulCleanup();

module.exports = app;
