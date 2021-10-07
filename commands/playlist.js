const searcher = require('../modules/music/searcher');
const playlistEmbed = require('../modules/embed/playlistEmbed');
const messageUtils = require('../modules/common/messageUtils');

module.exports = {
    commands: 'playlist',
    expectedArgs: '<search keywords>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments) => {
        const params = arguments.join(' ');
        searcher.searchPlaylistsByParams(params, 1, null,
            (resultPlaylist) => {
                const playlist = resultPlaylist.items[0];
                searcher.getPlaylistItems(playlist.id.playlistId, null, 
                    (resultPlaylistItems) => {
                        messageUtils.trySend(message,
                            playlistEmbed(resultPlaylist, resultPlaylistItems, params));
                    })
        });
    },
    permissions: [],
    requiredRoles: [],
    description: 'Search playlist in YouTube by keywords',
}