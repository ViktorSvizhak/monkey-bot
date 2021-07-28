const logger = require("./logger")

module.exports = {
    getTimeFromYoutubeFormat: (date) => {
        var regex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

        if (regex.test(date)) {
            [date, hours, minutes, seconds] = regex.exec(date);
            
            minutes = (+hours || 0) * 60 + (+minutes || 0);
            if (minutes < 10) {
                minutes = '0' + minutes;
            }

            if (seconds < 10) {
                seconds = '0' + seconds;
            }

            return `${minutes}:${seconds}`;
        } else {
            logger.warn(`Incorrect syntax. Can't convert from YouTube format "${date}"`);
            return 'unknown'
        }
    }
}