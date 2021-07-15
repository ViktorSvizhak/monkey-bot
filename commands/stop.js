const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'stop',
    callback: (message, arguments, text) => {
        if (!message.member.voice.channel){
            return message.channel.send(
                'You have to be in a voice channel to stop the music!'
            );
        }
        
        musicPlayer.stopPlaying(message.guild.id);
    },
    permissions: [],
    requiredRoles: [],
}
