const queueEmbed = require('../modules/embed/queueEmbed');
const musicPlayer = require('../modules/music/musicPlayer');


module.exports = {
    prefix: 'queuePage',
    callback: (button, pageNumber = 0) => {
        const queueInfo = musicPlayer.getQueueInfo(button.message.guild.id);
        button.reply.defer();
        button.message.edit(queueEmbed(queueInfo, Number(pageNumber)));
    }
}