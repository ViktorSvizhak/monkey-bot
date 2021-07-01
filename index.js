const path = require('path')
const fs = require('fs')
const Discord = require("discord.js");
const glitch = require("./modules/glitch")

const token = glitch.token;
const client = new Discord.Client();

glitch.start();

client.once("ready", () => {
  console.log("Ready!");

  const baseFile = 'command-base.js';
  const commandBase = require(`./commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));

    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));

      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(client, option);
      }
    }
  }

  readCommands('commands')
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.login(token);