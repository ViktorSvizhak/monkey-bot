const { MessageEmbed } = require('discord.js');
const configuration = require("../../configurations/configuration");

module.exports = (command) => {

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Detailed info about ${command.commandName} command`)
        .setTimestamp()
        .addField()

    return {
        embed: embed,
    };
}
