const serverQueueResolver = require("../modules/serverQueueResolver");

module.exports = {
    commands: 'stop',
    callback: (message, arguments, text) => {
        if (!message.member.voice.channel){
            return message.channel.send(
                "You have to be in a voice channel to stop the music!"
            );
        }
        
        const serverQueue = serverQueueResolver.get(message.guild);
    
        if (!serverQueue){
            return message.channel.send("There is no song that I could stop!");
        }
            
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    },
    permissions: [],
    requiredRoles: [],
}
