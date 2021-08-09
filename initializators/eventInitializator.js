const logger = require('../modules/common/logger')('eventInitializator');
const moduleLoader = require('./moduleLoader');

const events = moduleLoader('../events');

module.exports = (client) => {
    for (const event of events) {
        if (event.once) {
            client.once(event.name, (...args) => event.callback(...args));
            logger.info(`Register once event "${event.name}"`);
        } else {
            client.on(event.name, (...args) => event.callback(...args));
            logger.info(`Register on event "${event.name}"`);
        }
    }
}