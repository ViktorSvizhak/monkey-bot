const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const searcher = require('../modules/music/searcher');
const cache = require('../modules/common/cache');

module.exports = {
    commands: 'search',
    expectedArgs: '<search text>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) => {
        searcher.searchVideosByParams(arguments, 5,
            (result) => {
                let row = new MessageActionRow();
                //let list = 'Founded items:';
                let index = 0;
                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Search results')
                    //.setURL('https://discord.js.org/')
                    //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
                    //.setDescription('Some description here')
                    //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
                    // .addFields(
                    //     { name: 'Regular field title', value: 'Some value here' },
                    //     { name: '\u200B', value: '\u200B' },
                    //     { name: 'Inline field title', value: 'Some value here', inline: true },
                    //     { name: 'Inline field title', value: 'Some value here', inline: true },
                    // )
                    // .addField('Inline field title', 'Some value here', true)
                    // .setImage('https://i.imgur.com/wSTFkRM.png')
                    // .setTimestamp()
                    // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

                result.items.forEach(element => {
                    // let songInfo = {
                    //     url: element.id.videoId,
                    //     title: element.snippet.title
                    // };

                    //list += `\n\t${++index}. ${songInfo.title}`;
                    embed.addField(++index, element.snippet.title, false);
                    let button = new MessageButton()
                        .setStyle('blurple')
                        .setLabel(`Play ${index}`) 
                        .setID(`play ${index} ${element.id.videoId}`);
                    row.addComponent(button);
                    
                    //cache.put(songInfo.url, songInfo);
                });

                //message.channel.send(list, row);
                message.channel.send(embed, row);
        });
    },
    permissions: [],
    requiredRoles: [],
}

