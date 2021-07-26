const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'skip',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        if (!message.member.voice.channel) {
            return message.channel.send(
                'You have to be in a voice channel to stop the music!'
            );
        }
    
        musicPlayer.skipSong(message.guild.id);
    },
    permissions: [],
    requiredRoles: [],
}
