const musicPlayer = require('../modules/music/musicPlayer');
const songInfo = require('../modules/music/songInfo');
const searcher = require('../modules/music/searcher');
const messageUtils = require('../modules/common/messageUtils');

module.exports = {
    prefix: 'playlist',
    callback: (button, playlistId) => {
        const voiceChannel = button.clicker.member?.voice?.channel;
        if (!voiceChannel){
            return messageUtils.tryReply(message,
                'You need to be in a voice channel to play music!'
            );
        }

        const permissions = voiceChannel.permissionsFor(button.message.client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return messageUtils.tryReply(message,
                'I need the permissions to join and speak in your voice channel!'
            );
        }

        searchPlaylistItems(button, playlistId);

        button.reply.defer();
    }
}

function searchPlaylistItems(button, playlistId, pageToken) {
    const songs = [];
          
    searcher.getPlaylistItems(playlistId, pageToken,
        (result) => {
            result.items.forEach(element => {
                const song = new songInfo(element.snippet.title, 
                    element.snippet.resourceId.videoId);

                songs.push(song);
            });

            musicPlayer.addBatchSongs(
                button.message.guild.id, 
                songs, 
                button.clicker.member.voice.channel, 
                button.message.channel);

            if (result.nextPageToken) {
                searchPlaylistItems(button, playlistId, result.nextPageToken)
            }
        });
}