const logger = require('../modules/common/logger');

module.exports = {
	name: 'ready',
	once: true,
	callback: () => {
        logger.info('Bot Ready!')
    }
};