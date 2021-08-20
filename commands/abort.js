const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'abort',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        musicPlayer.abortConnection(message.guild.id);
    },
    permissions: [],
    requiredRoles: [],
    //description: 'Brute abort connection with voice channel',
}
