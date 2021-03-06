const messageUtils = require('../modules/common/messageUtils');
const playlistEmbed = require('../modules/embed/playlistEmbed');
const searcher = require('../modules/music/searcher');

module.exports = {
    prefix: 'playlistPage',
    callback: (button, pageToken, ...arguments) => {
        searcher.searchPlaylistsByParams(arguments, 1, pageToken,
            (resultPlaylist) => {
                const playlist = resultPlaylist.items[0];
                searcher.getPlaylistItems(playlist.id.playlistId, null, 
                    (resultPlaylistItems) => {
                        button.reply.defer();
                        messageUtils.tryEdit(button.message, 
                            playlistEmbed(resultPlaylist, resultPlaylistItems, ...arguments));
                    })
        });
    }
}