const ytdl = require('ytdl-core');
const musicPlayer = require('../modules/music/musicPlayer');
const searcher = require('../modules/music/searcher');
const songInfo = require('../modules/music/songInfo');

module.exports = {
    commands: 'play',
    expectedArgs: '<search keywords>',
    minArgs: 1,
    maxArgs: null,
    callback: async (message, arguments) => {
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
            const ytdlSongInfo = await ytdl.getInfo(arguments[0]);
            const song = new songInfo(ytdlSongInfo.videoDetails.title, 
                ytdlSongInfo.videoDetails.video_url);

            musicPlayer.addSingleSong(
                message.guild.id, 
                song, 
                message.member.voice.channel, 
                message.channel);
        } else {
            searcher.searchVideosByParams(arguments, 1,
                (result) => {
                const song = new songInfo(result.items[0].snippet.title,
                    result.items[0].id.videoId);

                    musicPlayer.addSingleSong(
                        message.guild.id, 
                        song, 
                        message.member.voice.channel, 
                        message.channel);
            });
        }
    },
    permissions: [],
    requiredRoles: [],
    //description: 'Play most related song by keyword. Possible process also URL and video ID',
    description: [
        '<search keywords> $$ Play most related song by keyword.',
        '<video URL> $$ Play song from YouTube URL.']
}