const fs = require('fs');
const logger = require('../modules/common/logger');
const moduleLoader = require('../initializators/moduleLoader');

const buttons = moduleLoader('../buttons');

module.exports = {
	name: 'clickButton',
	once: false,
	callback: async (button) => {
        const args = button.id.split(' ');
        const command = args.shift();
        buttons.filter(b => command == b.prefix)
            .forEach(element => element.callback(button, ...args));
    }
};