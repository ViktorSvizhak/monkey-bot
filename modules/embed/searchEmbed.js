const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');

module.exports = (searchResult) => {
    let buttons = [];
    let index = 0;

    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Search results')
        .setTimestamp()

    searchResult.items.forEach(element => {
        buttons.push(new MessageButton()
            .setStyle('blurple')
            .setID(`play ${index++} ${element.id.videoId}`)
            .setLabel(`Play ${index}`));
        embed.addField(`${index}. ${element.snippet.title}`, `Channel: ${element.snippet.channelTitle}`, false);
    });

    return {
        embed: embed,
        buttons: buttons
    };
}
