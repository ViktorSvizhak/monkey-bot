const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');

module.exports = {
    createPlaylistEmbed: (responsePlaylist, responsePlaylistItems) => {
        const playlist = responsePlaylist.items[0];

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(playlist.snippet.title)
            .setImage(playlist.snippet.thumbnails.default.url)
            .setTimestamp();
        
        let index = 0;

        responsePlaylistItems.items.forEach(element => {
            embed.addField(`${++index}. ${element.snippet.title}`, `Channel: ${element.snippet.channelTitle}`, false);
        })

        return embed;
    },

    createPlaylistButtons: (responsePlaylist, searchAttributes) => {
        const previousPageButton = new MessageButton()
            .setStyle('gray')
            .setID(`playlistPage ${responsePlaylist.prevPageToken} ${searchAttributes}`)
            .setLabel(`Previous page`)
            .setDisabled(!responsePlaylist.prevPageToken);

        const nextPageButton = new MessageButton()
            .setStyle('gray')
            .setID(`playlistPage ${responsePlaylist.nextPageToken} ${searchAttributes}`)
            .setLabel(`Next page`)
            .setDisabled(!responsePlaylist.nextPageToken);

        const playlistButton = new MessageButton()
            .setStyle('blurple')
            .setID(`playlist ${responsePlaylist.items[0].id.playlistId}`)
            .setLabel(`Play this playlist`);

        return new MessageActionRow()
            .addComponents(previousPageButton, playlistButton, nextPageButton);
    }
}