const ytdl = require("ytdl-core");
const serverQueueResolver = require("../modules/serverQueueResolver");

module.exports = {
    commands: 'play',
    expectedArgs: '<url>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            return message.channel.send(
                "You need to be in a voice channel to play music!"
            );
        }

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send(
                "I need the permissions to join and speak in your voice channel!"
            );
        }
        
        const songInfo = await ytdl.getInfo(arguments[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            };
        
        const serverQueue = serverQueueResolver.get(message.guild);
    
        if (!serverQueue) {
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
        
            serverQueueResolver.set(message.guild, queueContruct);
        
            queueContruct.songs.push(song);
        
            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                serverQueueResolver.delete(message.guild);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    },
    permissions: [],
    requiredRoles: [],
}

function play(guild, song) {
    serverQueue = serverQueueResolver.get(guild)

    if (!song) {
        serverQueue.voiceChannel.leave();
        serverQueueResolver.delete(guild);
        return;
    }
    
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}