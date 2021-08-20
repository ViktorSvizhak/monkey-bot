const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'current',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        const queueInfo = musicPlayer.getQueueInfo(message.guild.id);

        if(!queueInfo?.currentSong) {
            return message.channel.send("No song is playing right now");
        }

        return message.channel.send(`Now playing song **"${queueInfo.currentSong.title}"**`);
    },
    permissions: [],
    requiredRoles: [],
    description: 'Get current playing song name',
}
