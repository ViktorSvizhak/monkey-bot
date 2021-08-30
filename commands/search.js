const searchEmbed = require("../modules/embed/searchEmbed");
const searcher = require('../modules/music/searcher');

module.exports = {
    commands: 'search',
    expectedArgs: '<search keywords>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments) => {
        searcher.searchVideosByParams(arguments, 5,
            (result) => {
                message.channel.send(searchEmbed(result));
        });
    },
    permissions: [],
    requiredRoles: [],
    description: '<search keywords> $$ Search top 5 songs in YouTube by keywords',
}

