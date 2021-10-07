const helpEmbed = require('../modules/embed/helpEmbed');
const helpDetailedEmbed = require('../modules/embed/helpDetailEmbed');
const helpHandler = require('../modules/common/helpHandler');
const messageUtils = require('../modules/common/messageUtils');

const embeds = new Map();

module.exports = {
    commands: 'help',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments) => {
        if (!arguments.length) {
            return messageUtils.trySend(message, getAllCommandsEmbed())
        }

        var commandName = arguments.shift(); 
        
        return messageUtils.trySend(message, getDetailedCommandEmbed(commandName))
    },
    permissions: [],
    requiredRoles: [],
    description: [
        'Get info about all commands',
        '<command name> $$ Get detailed info about selected command'
    ]
}

function getAllCommandsEmbed() {
    var embed = embeds.get('_all');

    if (embed) {
        return embed;
    }

    const commands = helpHandler.getCommands();
    embed = helpEmbed(commands);

    embeds.set('_all', embed);

    return embed;
}

function getDetailedCommandEmbed(commandName) {
    var embed = embeds.get(commandName);

    if (embed) {
        return embed;
    }

    const command = helpHandler.getDetailedCommand(commandName);

    if (!command) {
        return `Undefined command **"${commandName}"**! Use command **"help"**, to check posible commands`
    }

    embed = helpDetailedEmbed(command);

    embeds.set(commandName, embed);

    return embed;
}