const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');

module.exports = (queueInfo, pageNumber = 0) => {
    return {
        embed: createEmbed(queueInfo, pageNumber),
        buttons: createButtons(queueInfo, pageNumber)
    };
} 

function createEmbed(queueInfo, pageNumber) {
    var songList = '';

    for(var i = 1; i <= 10; i++) {
        var index = pageNumber * 10 + i;

        if(!queueInfo.queueSong[index - 1]) {
            break;
        }

        songList += `${index}. ${queueInfo.queueSong[index - 1].title.slice(0, 90)}\n`;
    }
    
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Queue of songs')
        .setTimestamp()
        .setFooter(`Page ${pageNumber + 1} of ${getCountOfPage(queueInfo)}`)
        .addField('Currently play',  queueInfo.currentSong.title, false)
        .addField('Songs in queue', songList, false);
}

function createButtons(queueInfo, pageNumber) {
    const previousPageButton = new MessageButton()
        .setStyle('gray')
        .setID(`queuePage ${pageNumber - 1}`)
        .setLabel(`Previous page`)
        .setDisabled(pageNumber === 0);

    const nextPageButton = new MessageButton()
        .setStyle('gray')
        .setID(`queuePage ${pageNumber + 1}`)
        .setLabel(`Next page`)
        .setDisabled(getCountOfPage(queueInfo) <= pageNumber + 1);

    const refreshButton = new MessageButton()
        .setStyle('gray')
        .setID(`queuePage`)
        .setLabel(`Refresh Queue`)

    return [previousPageButton, refreshButton, nextPageButton];
}

function getCountOfPage(queueInfo) {
    if(!queueInfo?.queueSong) {
        return 0;
    }

    return Math.ceil(queueInfo.queueSong.length / 10);
}