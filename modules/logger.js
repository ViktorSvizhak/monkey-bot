module.exports = {
    info: (message) => {
        console.log(formatMessage(message));
    },

    warn: (message) => {
        console.warn(formatMessage(message));
    },

    error: (exception, message) => {
        console.error(
            formatMessage(`${message}\nException:\n${exception}`));
    }
}

function formatMessage(message) {
    return `[${new Date().toISOString()}] ${message}`;
}