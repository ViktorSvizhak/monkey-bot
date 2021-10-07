const messageUtils = require('../modules/common/messageUtils');
const queueEmbed = require('../modules/embed/queueEmbed');
const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'queue',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        const queueInfo = musicPlayer.getQueueInfo(message.guild.id);

        if(!queueInfo) {
            return messageUtils.trySend(message, 'No songs in the queue');
        }

        return messageUtils.trySend(message, queueEmbed(queueInfo));
    },
    permissions: [],
    requiredRoles: [],
    description: 'Get queue of songs',
}
