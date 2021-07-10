const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'skip',
    callback: (message, arguments, text) => {
        if (!message.member.voice.channel) {
            return message.channel.send(
                'You have to be in a voice channel to stop the music!'
            );
        }
    
        musicPlayer.skipSong(message);
    },
    permissions: [],
    requiredRoles: [],
}
