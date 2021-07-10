const searcher = require('../modules/searcher');

module.exports = {
    commands: 'search',
    expectedArgs: '<search text>',
    minArgs: 1,
    maxArgs: null,
    callback: (message, arguments, text) => {
        var result = searcher.searchVideosByParams(arguments, (result) => {
            let list = 'Founded items:';
            result.items.forEach(element => {
                list += `\n\t${element.id.videoId}`;
            });

            message.channel.send(list);
        });
    },
    permissions: [],
    requiredRoles: [],
}

