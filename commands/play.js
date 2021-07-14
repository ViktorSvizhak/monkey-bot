const ytdl = require('ytdl-core');
const musicPlayer = require('../modules/music/musicPlayer');
const searcher = require('../modules/music/searcher');

module.exports = {
    commands: 'play',
    expectedArgs: '<search text>',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments, text) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            return message.channel.send(
                'You need to be in a voice channel to play music!'
            );
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send(
                'I need the permissions to join and speak in your voice channel!'
            );
        }
        
        if (arguments.length == 1 && 
            (ytdl.validateID(arguments[0]) || ytdl.validateURL(arguments[0]))) {
            const songInfo = await ytdl.getInfo(arguments[0]);
            const song = createSong(songInfo.videoDetails.title, 
                songInfo.videoDetails.video_url)

            musicPlayer.addSong(message, song);
        } else {
            searcher.searchVideosByParams(arguments, 1,
                (result) => {
                const song = createSong(result.items[0].snippet.title,
                    result.items[0].id.videoId);

                musicPlayer.addSong(message, song)
            });
        }
    },
    permissions: [],
    requiredRoles: [],
}

function createSong(title, url) {
    return {
        title: title,
        url: url,
    };
}