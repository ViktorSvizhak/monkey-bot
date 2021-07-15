const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'abort',
    callback: (message, arguments, text) => {
        musicPlayer.abortConnection(message.guild.id);
    },
    permissions: [],
    requiredRoles: [],
}
