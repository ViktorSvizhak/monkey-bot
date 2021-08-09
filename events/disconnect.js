const logger = require('../modules/common/logger')('disconnect-event');

module.exports = {
	name: 'disconnect',
	once: true,
	callback: (client) => {
		logger.info('Disconnect!');
	},
};