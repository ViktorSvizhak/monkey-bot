const logger = require('../modules/infrastructure/logger');

module.exports = {
	name: 'ready',
	once: true,
	callback: () => {
        logger.info('Bot Ready!')
    }
};