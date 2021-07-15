const logger = require("../modules/common/logger");

module.exports = {
	name: 'disconnect',
	once: true,
	callback: (client) => {
		logger.info('Disconnect!');
	},
};