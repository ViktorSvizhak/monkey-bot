const ytdl = require('ytdl-core');
const cache = require('../modules/common/cache');
const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    prefix: 'play_',
    callback: async (button, params) => {
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

        const song = getSongInfo(params);
        
        musicPlayer.addSong(button.message, song);
    }
}

async function getSongInfo(songId) {
    const cachedSong = cache.get(songId);

    if (cachedSong) {
        return cachedSong
    }

    const songInfo = await ytdl.getInfo(songId);
    return {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
    };
}