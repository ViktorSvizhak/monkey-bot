const helpEmbed = require('../modules/embed/helpEmbed');
const helpHandler = require('../modules/common/helpHandler');

const embeds = new Map();

module.exports = {
    commands: 'help',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments) => {
        if (!arguments.length) {
            return message.channel.send(getAllCommandsEmbed());
        }

        var commandName = arguments.unshift(); 
        
        return message.channel.send(getDetailedCommandEmbed(commandName));
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
    //TODO
}