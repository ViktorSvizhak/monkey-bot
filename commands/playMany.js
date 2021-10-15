const ytdl = require('ytdl-core');
const logger = require('../modules/common/logger')('playMany-command');
const messageUtils = require('../modules/common/messageUtils');
const musicPlayer = require('../modules/music/musicPlayer');
const searcher = require('../modules/music/searcher');
const songInfo = require('../modules/music/songInfo');

module.exports = {
    commands: 'play:',
    expectedArgs: '<search keywords>',
    minArgs: 1,
    maxArgs: null,
    callback: async (message) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            return messageUtils.tryReply(message, 
                'You need to be in a voice channel to play music!')
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return messageUtils.tryReply(message,
                'I need the permissions to join and speak in your voice channel!'
            );
        }
    
        const allArguments = message.content.split(/\n+/);

        //remove command name
        allArguments.shift();

        let sentFailedMessage = false;

        allArguments.forEach(arguments => {
            searcher.searchVideosByParams(arguments, 1,
                (result) => {
                    if (!result.items.length) {
                        logger.warn(`Failed to search song by text "${arguments}"`);
                        
                        if (!sentFailedMessage) {
                            messageUtils.tryReply(message, 'Some of your songs is failed to play');
                            sentFailedMessage = true;
                        }

                        return;
                    }

                    const song = new songInfo(result.items[0].snippet.title,
                        result.items[0].id.videoId);

                    musicPlayer.addSingleSong(
                        message.guild.id, 
                        song, 
                        message.member.voice.channel, 
                        message.channel);
            });
        });
    },
    permissions: [],
    requiredRoles: [],
    description: [
        '<songs divided by paragraph> $$ Play all songs (similar to **play** command)']
}