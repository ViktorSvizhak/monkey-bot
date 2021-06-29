const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const Enumerable = require('linq');

const PREFIX = 'GACHI ';
const FILE_NAME = 'gachi.json';
const PLAY_PREFIX = '!play';

const client = new Discord.Client();

client.on('message', function(message) { 
    if (message.author.bot) {
        return;
    }

    if (!message.content.startsWith(PREFIX)) {
        return;
    }

    const commandBody = message.content.slice(PREFIX.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    switch(command){
        case 'ping':
            ping(message);
            break;

        case 'get':
            getPlaylist(message, args);
            break;

        case 'add':
            addPlaylist(message, args);
            break;

        case 'play':
            playPlaylist(message, args);
            break;

        default:
            message.reply(`I'm not understand this gachi`);
            break;
    }
});                                      

client.login(config.BOT_TOKEN);

function getData(){
    let rawdata = fs.readFileSync(FILE_NAME);
    return JSON.parse(rawdata);
}

function setData(data){
    fs.writeFileSync(FILE_NAME, JSON.stringify(data));
}

function getPlaylist(message, args){
    let arr = getData();
    let playlistName = args.shift();
    let data = Enumerable.from(arr).firstOrDefault(x=>x.name == playlistName);

    if(data == null)
    {
        message.reply(`Not found playlist **${playlistName}**!`);
        return;
    }

    message.reply(`Found: ${JSON.stringify(data)}`);
}

function addPlaylist(message, args){
    let arr = getData();
    let playlistName = args.shift();
    let data = Enumerable.from(arr).firstOrDefault(x=>x.name == playlistName);

    if(data != null){
        data.songs = Enumerable.from(arr).union(args);

        setData(arr);

        message.reply(`Playlist **${playlistName}** updated!`);
        return;
    }

    data = {
        name : playlistName,
        songs : args
    }
    arr.push(data);

    setData(arr);

    message.reply(`New playlist **${playlistName}** created!`);
}

function playPlaylist(message, args){
    let arr = getData();
    let playlistName = args.shift();
    let data = Enumerable.from(arr).firstOrDefault(x=>x.name == playlistName);

    if(data == null){
        message.reply(`Not found playlist **${playlistName}**!`);
        return;
    }

    data.songs.unshift('\n');

    let res = data.songs.join(`\n ${PLAY_PREFIX} `);
    message.channel.send(res);
    //message.reply(res);
}

function ping(message){
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
}