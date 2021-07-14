const path = require('path')
const fs = require('fs')
const Discord = require("discord.js");
const glitch = require("./modules/infrastructure/glitch");
const logger = require('./modules/infrastructure/logger');
const configuration = require('./configurations/configuration');

const client = new Discord.Client();
require('discord-buttons')(client);

glitch();

//EventHandler
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
 	const event = require(`./events/${file}`);

 	if (event.once) {
 		client.once(event.name, (...args) => event.callback(...args));
 	} else {
 		client.on(event.name, (...args) => event.callback(...args));
 	}
}

//CommandHandler
const baseFile = 'command-base.js';
const commandBase = require(`./commands/${baseFile}`);

const readCommands = (dir) => {
	const files = fs.readdirSync(path.join(__dirname, dir));

	for (const file of files) {
		const stat = fs.lstatSync(path.join(__dirname, dir, file));

		if (stat.isDirectory()) {
			readCommands(path.join(dir, file));
		} else if (file !== baseFile) {
			const option = require(path.join(__dirname, dir, file));
			commandBase(client, option);
		}
	}
}

readCommands('./commands')

client.login(configuration.botToken);