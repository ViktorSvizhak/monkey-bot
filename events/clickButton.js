const fs = require('fs');
const logger = require('../modules/common/logger');

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
        const args = button.id.split(' ');
        const command = args.shift();
        buttons.filter(b => command == b.prefix)
            .forEach(element => element.callback(button, ...args));
        return true;
    }
};