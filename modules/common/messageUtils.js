const logger = require('./logger')('messageUtils');

const OOPS_TEXT = 'Oops ... Something went wrong :( \nPlease contact us'

module.exports = {
    trySend: (message, messageContent, channel) => {
        if (message?.channel) {
            channel = message.channel;
        }

        if (!channel || !messageContent) {
            return;
        }

        channel.send(messageContent)
            .catch(function(ex) {
                logger.error(ex, 'Failed to send message');

                tryReply(message, OOPS_TEXT);
            });
    },

    tryReply: (message, messageContent) => {
        if (!message || !messageContent) {
            return;
        }

        message.reply(messageContent)
            .catch(function(ex) {
                logger.error(ex, 'Failed to reply message');

                message.channel.reply(OOPS_TEXT)
                    .catch(function(innerEx) {
                        logger.fatal(innerEx, 'Failed to send base reply');
                    })
            });
    },

    tryEdit: (message, messageContent) => {
        if (!message || !messageContent) {
            return;
        }

        message.edit(messageContent)
            .catch(function(ex) {
                logger.error(ex, 'Failed to edit message');

                tryReply(message, OOPS_TEXT);
            });
    }
}