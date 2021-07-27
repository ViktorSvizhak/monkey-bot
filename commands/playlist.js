const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const searcher = require('../modules/music/searcher');

module.exports = {
    commands: 'playlist',
    expectedArgs: '<search text>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments) => {
        searcher.searchPlaylistsByParams(arguments, 5,
            (result) => {
                let row = new MessageActionRow();
                let index = 0;

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Search results')
                    .setAuthor(message.author.username, message.author.avatarURL())
                    .setTimestamp()

                    result.items.forEach(element => {
                        row.addComponent(new MessageButton()
                            .setStyle('blurple')
                            .setID(`playlist ${element.id.playlistId}`)
                            .setLabel(`Play ${++index}`));
                        embed.addField(`${index}. ${element.snippet.title}`, `Channel: ${element.snippet.channelTitle}`, false);
                });

                message.channel.send(embed, row);
        });
    },
    permissions: [],
    requiredRoles: [],
}