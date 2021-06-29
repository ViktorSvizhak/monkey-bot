const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const musicCore = require("./modules/music.js");
const glitch = require("./modules/glitch.js")


const client = new Discord.Client();
glitch.start();

client.once("ready", () => {
  console.log("Ready!");
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = musicCore.queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    musicCore.play(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    musicCore.skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    musicCore.stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }
});

client.login(token);