const ytdl = require('ytdl-core');

const servers = new Map();

module.exports = {
    addSong: (message, song) => {
        let serverQueue = servers.get(message.guild.id)
        if (!serverQueue) {
            serverQueue = initServerQueue(message);
        }
        serverQueue.songs.push(song);

        startPlaying(serverQueue);
    },

    skipSong: (message) => {
        const serverQueue = servers.get(message.guild.id);
    
        try {
            serverQueue.connection.dispatcher.end();

            serverQueue.textChannel.send('Song skipped');
        } catch (ex) {
            console.error(ex);
        }
    },

    stopPlaying: (message) => {
        const serverQueue = servers.get(message.guild);
            
        try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();

            serverQueue.textChannel.send('Playing stopped');
        } catch (ex) {
            console.error(ex);
        }
    }
}

function initServerQueue(message) {
    const queueContruct = {
        textChannel: message.channel,
        voiceChannel: message.member.voice.channel,
        connection: null,
        songs: [],
        volume: 5,
        playing: false
    };

    servers.set(message.guild.id, queueContruct);

    console.log(`Creating new queue for ${message.guild.id}`);

    return queueContruct;
}

async function startPlaying(serverQueue) {
    if(serverQueue.playing){
        return
    }

    try {
        serverQueue.playing = true;
        serverQueue.connection = await serverQueue.voiceChannel.join();
    
        playLoop(serverQueue);
    } catch (ex) {
        console.error(ex);
        return serverQueue.textChannel.send(ex);
    }
}

function playLoop(serverQueue) {
    let song = serverQueue.songs.shift();

    if (!song) {
        serverQueue.voiceChannel.leave();
        serverQueue.playing = false;

        return;
    }
    
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () => {
            playLoop(serverQueue);
        })
        .on('error', (error) => {
            console.error(error)
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
