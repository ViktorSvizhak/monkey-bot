const ytdl = require('ytdl-core');
const messageUtils = require('../common/messageUtils');
const logger = require('../common/logger')('musicPlayer');

const servers = new Map();

module.exports = {
    addSingleSong: (serverId, song, voiceChannel, textChannel) => {
        let serverQueue = servers.get(serverId)
        if (!serverQueue) {
            serverQueue = initServerQueue(serverId, voiceChannel, textChannel);
        } else {
            messageUtils.trySend(null, 
                `Song **${song.title}** added to queue`, serverQueue.textChannel);
        }
        serverQueue.songs.push(song);

        startPlaying(serverQueue);
    },

    addBatchSongs: (serverId, songs, voiceChannel, textChannel) => {
        let serverQueue = servers.get(serverId)
        if (!serverQueue) {
            serverQueue = initServerQueue(serverId, voiceChannel, textChannel);
        }
        
        songs.forEach(element => {
            serverQueue.songs.push(element);
        })

        logger.info(`Added ${songs.length} songs to queue ${serverId}`);

        startPlaying(serverQueue);
    },

    skipSong: (serverId) => {
        const serverQueue = servers.get(serverId);

        if (!serverQueue) {
            logger.warn(`Server queue with id ${serverId} not found`);
            return;
        }

        try {
            serverQueue.connection?.dispatcher?.end();
            return messageUtils.trySend(null, 'Song skipped', serverQueue.textChannel);
        } catch (ex) {
            logger.error(ex, 'Failed skip song');
        }
    },

    stopPlaying: (serverId) => {
        const serverQueue = servers.get(serverId);
            
        if (!serverQueue) {
            logger.warn(`Server queue with id ${serverId} not found`);
            return;
        }

        try {
            serverQueue.songs = [];
            serverQueue.connection?.dispatcher?.end();

            return messageUtils.trySend(null, 'Playing stopped', serverQueue.textChannel);
        } catch (ex) {
            logger.error(ex, 'Failed stop playing');
        }
    },

    abortConnection: (serverId) => {
        const serverQueue = servers.get(serverId);

        if (serverQueue) {
            serverQueue.songs = [];
            serverQueue.connection?.dispatcher?.end();
            servers.delete(serverId);

            logger.info(`Connection to ${serverId} aborted`)
        }
    },

    getQueueInfo: (serverId) => {
        const serverQueue = servers.get(serverId);

        if (!serverQueue) {
            return;
        }

        return {
            currentSong: serverQueue.currentSong,
            queueSong: serverQueue.songs
        };
    },
}

function initServerQueue(serverId, voiceChannel, textChannel) {
    const queueContruct = {
        textChannel: textChannel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: false,
        currentSong: null,
        serverId: serverId
    };

    servers.set(serverId, queueContruct);

    logger.info(`Creating new queue for ${serverId}`);

    return queueContruct;
}

async function startPlaying(serverQueue) {
    if(serverQueue.playing){
        return;
    }

    try {
        serverQueue.playing = true;
        serverQueue.connection = await serverQueue.voiceChannel.join();
    
        playLoop(serverQueue);
    } catch (ex) {
        logger.error(ex, 'failed to play song');
        return messageUtils.trySend(null, 'Failed to play song', serverQueue.textChannel);
    }
}

function playLoop(serverQueue) {
    let song = serverQueue.songs.shift();

    if (!song) {
        serverQueue.voiceChannel.leave();
        serverQueue.playing = false;

        servers.delete(serverQueue.serverId);

        return;
    }
    
    serverQueue.currentSong = song;

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url, { filter: 'audioonly' }))
        .on('finish', () => {
            serverQueue.currentSong = null;
            playLoop(serverQueue);
        })
        .on('error', (error) => {
            logger.error(error, "Failed to play song");
            messageUtils.trySend(null, 
                `Oops... Sorry, I fuck up to play **${serverQueue.currentSong?.title}**. Let's try next song`,
                serverQueue.textChannel)
            serverQueue.currentSong = null;
            playLoop(serverQueue);
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    messageUtils.trySend(null, `Start playing: **${song.title}**`, serverQueue.textChannel)
}
