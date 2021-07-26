const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'current',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        const song = musicPlayer.getCurrentSong(message.guild.id);

        if(!song) {
            return message.channel.send("No song is playing right now");
        }

        return message.channel.send(`Now playing song **"${song.title}"**`);
    },
    permissions: [],
    requiredRoles: [],
}
