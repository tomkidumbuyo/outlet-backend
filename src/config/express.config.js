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

// mongoDB connection instance
const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI_URI;

mongoose.connect(connectionString);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error);
});

database.once('connected', () => {
	console.log('Database Connected');
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
app.use(cors());

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
