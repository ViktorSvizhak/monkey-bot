const DESCRIPTION_PATTERN = '$$';

const commands = []

module.exports = {
    initializeCommand: (command) => {
        if (!command.description?.length) {
            return;
        }

        const commandInfo = {
            commandName: command.commands[0],
            description: command.description.map(element => {
                if (!element.includes(DESCRIPTION_PATTERN)) {
                    return `${DESCRIPTION_PATTERN} ${element}`;
                }

                return element;
            }),
            permissions: command.permissions,
            roles: command.requiredRoles
        }

        commands.push(commandInfo);
    },

    getCommands: () => {
        return commands;
    },

    getDetailedCommand: (commandName) => {
        return commands.find(element => element.commandName === commandName);
    }
}