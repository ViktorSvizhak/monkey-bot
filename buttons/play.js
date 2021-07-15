const ytdl = require('ytdl-core');
const musicPlayer = require('../modules/music/musicPlayer');
const songInfo = require('../modules/music/songInfo');

module.exports = {
    prefix: 'play',
    callback: async (button, index, songId) => {
        const voiceChannel = button.clicker.member.voice.channel;
        if (!voiceChannel){
            return button.message.channel.send(
                'You need to be in a voice channel to play music!'
            );
        }

        const permissions = voiceChannel.permissionsFor(button.message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return button.message.channel.send(
                'I need the permissions to join and speak in your voice channel!'
            );
        }

        const song = new songInfo(button.message.embeds[0].fields[index].name.substring(3), songId);
        
        musicPlayer.addSong(
            button.message.guild.id, 
            song, 
            button.clicker.member.voice.channel, 
            button.message.channel);
    }
}