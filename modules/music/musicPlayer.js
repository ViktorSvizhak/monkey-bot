const ytdl = require('ytdl-core');
const logger = require('../common/logger')('musicPlayer');

const servers = new Map();

module.exports = {
    addSingleSong: (serverId, song, voiceChannel, textChannel) => {
        let serverQueue = servers.get(serverId)
        if (!serverQueue) {
            serverQueue = initServerQueue(serverId, voiceChannel, textChannel);
        } else {
            serverQueue.textChannel.send(`Song **${song.title}** added to queue`);
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
            serverQueue.textChannel.send('Song skipped');
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

            serverQueue.textChannel.send('Playing stopped');
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
        currentSong: null
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
    
    serverQueue.currentSong = song;

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url, { filter: 'audioonly' }))
        .on('finish', () => {
            serverQueue.currentSong = null;
            playLoop(serverQueue);
        })
        .on('error', (error) => {
            logger.error(error, "Failed to play song")
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
