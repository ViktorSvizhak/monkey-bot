const Discord = require("discord.js");
const configuration = require('./configurations/configuration');
const eventInitializator = require('./initializators/eventInitializator');

const client = new Discord.Client();
require('discord-buttons')(client);

eventInitializator(client);

client.login(configuration.botToken);