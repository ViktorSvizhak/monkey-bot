const searcher = require('../modules/music/searcher');
const playlistEmbed = require('../modules/embed/playlistEmbed');

module.exports = {
    commands: 'playlist',
    expectedArgs: '<search text>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments) => {
        const params = arguments.join(' ');
        searcher.searchPlaylistsByParams(params, 1, null,
            (resultPlaylist) => {
                const playlist = resultPlaylist.items[0];
                searcher.getPlaylistItems(playlist.id.playlistId, null, 
                    (resultPlaylistItems) => {
                        message.channel.send(playlistEmbed(resultPlaylist, resultPlaylistItems, params));
                    })
        });
    },
    permissions: [],
    requiredRoles: [],
}