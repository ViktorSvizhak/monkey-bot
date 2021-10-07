const { MessageEmbed } = require('discord.js');
const configuration = require("../../configurations/configuration");

module.exports = (commands) => {

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Possible commands')
        .setTimestamp();

    commands.forEach(command => {
        command.description.forEach(description => {
            let [params, info] = description.split('$$');
            embed.addField(`${configuration.prefix}${command.commandName} ${params}`, info, false);
        })
    });

    return {
        embed: embed,
    };
}
