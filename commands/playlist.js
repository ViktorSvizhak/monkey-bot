const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
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
                        const embed = playlistEmbed.createPlaylistEmbed(resultPlaylist, resultPlaylistItems);
                        const buttons = playlistEmbed.createPlaylistButtons(resultPlaylist, params);
                        
                        message.channel.send(embed, buttons);
                    })
        });
    },
    permissions: [],
    requiredRoles: [],
}