const logger = require('../modules/common/logger')('ready-event');

module.exports = {
	name: 'ready',
	once: true,
	callback: () => {
        logger.info('Bot Ready!')
    }
};