const logger = require('../modules/common/logger')('message-event');
const moduleLoader = require('../initializators/moduleLoader');
const configuration = require('../configurations/configuration');

const commands = moduleLoader('../commands', commandFormatter);

module.exports = {
	name: 'message',
	once: false,
	callback: (message) => {
        if (!message.content.startsWith(configuration.prefix)) {
            return;
        }

        const arguments = message.content.split(/[ ]+/);
        const commandName = arguments.shift().substring(configuration.prefix.length);

        const command = commands.find(element => element.commands.some(alias => commandName.toLowerCase() === alias));

        if (!command) {
            return;
        }

        for (const permission of command.permissions) {
            if (!member.hasPermission(permission)) {
                message.reply(permissionError);
                return;
            }
        }

        for (const requiredRole of command.requiredRoles) {
            const role = guild.roles.cache.find(
                (role) => role.name === requiredRole
            );

            if (!role || !member.roles.cache.has(role.id)) {
                message.reply(
                    `You must have the "${requiredRole}" role to use this command.`
                );
                return;
            }
        }

        if (arguments.length < command.minArgs || (command.maxArgs !== null && arguments.length > command.maxArgs)) {
            message.reply(
                `Incorrect syntax! Use ${configuration.prefix}${command.commands[0]} ${command.expectedArgs}`
            );
            return;
        }

        logger.debug(`Excecuting command ${command.commands[0]}`);

        command.callback(message, arguments);
    }
}

function commandFormatter(commandOptions) {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions;

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands];
    }

    logger.info(`Registering command "${commands[0]}"`);

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions];
        }

        validatePermissions(permissions);
    }

    return {
        commands: commands,
        expectedArgs: expectedArgs,
        permissionError: permissionError,
        minArgs: minArgs,
        maxArgs: maxArgs,
        permissions: permissions,
        requiredRoles: requiredRoles,
        callback: callback,
    }
}

const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ];

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`);
        }
    }
}
