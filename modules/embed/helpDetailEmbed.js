const { MessageEmbed } = require('discord.js');
const configuration = require("../../configurations/configuration");

module.exports = (command) => {

    const permissions = command.permissions.length ? command.permissions.join(', ') : 'No permissions required';
    const roles = command.roles.length ? command.roles.join(', ') : 'No roles required';

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Detailed info about "${command.commandName}" command`)
        .setTimestamp()
        .addField('Required permissions', permissions, true)
        .addField('Required roles', roles, true);

        command.description.forEach(description => {
            let [params, info] = description.split('$$');
            embed.addField(`${configuration.prefix}${command.commandName} ${params}`, info, false);
        })

    return {
        embed: embed,
    };
}
