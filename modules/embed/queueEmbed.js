const { MessageEmbed } = require('discord.js');

module.exports = {
    createEmbed: (queueInfo) => {
        var songList = '';
        var index = 0;
        queueInfo.queueSong.forEach(element => {
            songList += `${++index}. ${element.title}\n`;
        })
        
        return new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Queue of songs')
            .setTimestamp()
            .addField('Currently play',  queueInfo.currentSong.title, false)
            .addField('Songs in queue', songList, false);
    }
}