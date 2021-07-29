const musicPlayer = require('../modules/music/musicPlayer');

module.exports = {
    commands: 'queue',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments) => {
        const songs = musicPlayer.getAllSongs(message.guild.id);

        if(!songs) {
            return message.channel.send("No songs in the queue");
        }

        var songList = 'Songs queue:';
        var index = 0;
        songs.forEach(element => {
            songList += `\n${++index}. ${element.title}`;
        })

        return message.channel.send(songList);
    },
    permissions: [],
    requiredRoles: [],
}
