const logger = require("../modules/infrastructure/logger");

module.exports = {
	name: 'disconnect',
	once: true,
	callback: (client) => {
		logger.info('Disconnect!');
	},
};