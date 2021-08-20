const requireLazy = require('../modules/common/requireLazy');
const fileConfig = requireLazy('/configurations/config.json');

module.exports = {
    prefix: process?.env?.bot_prefix 
        ?? fileConfig.module.bot_prefix,
    botToken: process?.env?.bot_token 
        ?? fileConfig.module.bot_token,
    youtubeToken: process?.env?.youtube_token 
        ?? fileConfig.module.youtube_token,
    coralogixToken: process?.env?.coralogix_token
        ?? fileConfig.module.coralogix_token,
    loggerAppender: process?.env?.logger_appender
        ?? fileConfig.module.logger_appender,
    loggerLevel: process?.env?.logger_level
        ?? fileConfig.module.logger_level,
}