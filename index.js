const path = require('path')
const fs = require('fs')
const Discord = require("discord.js");
const logger = require('./modules/common/logger');
const configuration = require('./configurations/configuration');

const client = new Discord.Client();

//glitch();

client.once("ready", () => {
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

    readCommands('commands')

    logger.info('Bot Ready!')
});

client.once('reconnecting', () => {
    logger.info('Bot Reconnecting!')
});

client.once('disconnect', () => {
    logger.info('Disconnect!')
});

client.login(configuration.botToken);