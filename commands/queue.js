const queueEmbed = require('../modules/embed/queueEmbed');
const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'queue',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        const queueInfo = musicPlayer.getQueueInfo(message.guild.id);

        if(!queueInfo) {
            return message.channel.send("No songs in the queue");
        }

        return message.channel.send(queueEmbed.createEmbed(queueInfo));
    },
    permissions: [],
    requiredRoles: [],
}
