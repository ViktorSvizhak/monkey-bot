const fs = require('fs');
const logger = require('../modules/infrastructure/logger');

const buttons = [];
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
for (const file of buttonFiles) {
    const button = require(`../buttons/${file}`);
    buttons.push(button);
}

module.exports = {
	name: 'clickButton',
	once: false,
	callback: async (button) => {
        const foundButtons = buttons.filter(b => button.id.startsWith(b.prefix));

        if (foundButtons.length != 1) {
            logger.warn(`Action for button ${button.id} not found. Found ${foundButtons.length} events`);
        }

        foundButtons[0].callback(button, button.id.substring(foundButtons[0].prefix.length));
    }
};