const { port, env } = require('./src/constants');
const app = require('./src/config/express.config');
const logger = require('./src/api/utils/logger')(__filename);

// listen to requests
app.listen(port, (err) => {
	if (err) {
		return logger.error('server failed to start', err);
	}
	return logger.info(`server started [env, port] = [${env}, ${port}]`);
});

/**
 * Exports express
 * @public
 */
module.exports = app;
