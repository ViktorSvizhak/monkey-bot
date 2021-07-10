const requireLazy = require('../modules/requireLazy');
const fileConfig = requireLazy('/configuration/config.json');

module.exports = {
    prefix: process?.env?.bot_prefix 
        ?? fileConfig.module.bot_prefix,
    botToken: process?.env?.bot_token 
        ?? fileConfig.module.bot_token,
    youtubeToken: process?.env?.youtube_token 
        ?? fileConfig.module.youtube_token
}