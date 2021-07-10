const ytdl = require('ytdl-core');
const logger = require('./logger');

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

        if (!serverQueue) {
            logger.warn(`Server queue with id ${message.guild.id} not found`);
            return message.channel.send(`Nothing to **skip**`);
        }

        try {
            serverQueue.connection.dispatcher.end();
            serverQueue.textChannel.send('Song skipped');
        } catch (ex) {
            logger.error(ex, 'Failed skip song');
        }
    },

    stopPlaying: (message) => {
        const serverQueue = servers.get(message.guild.id);
            
        if (!serverQueue) {
            logger.warn(`Server queue with id ${message.guild.id} not found`);
            return message.channel.send(`Nothing to **stop**`);
        }

        try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();

            serverQueue.textChannel.send('Playing stopped');
        } catch (ex) {
            logger.error(ex, 'Failed stop playing');
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

    logger.info(`Creating new queue for ${message.guild.id}`);

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
        logger.error(ex, 'failed to play song');
        return serverQueue.textChannel.send(`Failed to play song`);
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
