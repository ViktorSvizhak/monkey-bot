var bunyan = require('bunyan');
var CoralogixBunyan = require('coralogix-logger-bunyan');
var configuration = require('../../configurations/configuration');

var config = {
    privateKey: configuration.coralogixToken,
    applicationName: 'bot-monkey',
    subsystemName: 'bot-core',
};

const stream = configureStream();

module.exports = (loggerName) => {
    return bunyan.createLogger({
        name: loggerName,
        streams: [ stream ]
    });
}

function configureStream() {
    switch(configuration.loggerAppender) {
        case 'coralogix':
            CoralogixBunyan.CoralogixStream.configure(config);
        
            return {
                level: configuration.loggerLevel,
                stream: new CoralogixBunyan.CoralogixStream(),
                type: 'raw'
            };
        
        case 'console':
            return {
                level: configuration.loggerLevel,
                stream: {
                    write: (log) => {
                        log.level = bunyan.nameFromLevel[log.level];
                        
                        var logLine = `${log.time.toISOString()} - ${log.level.toUpperCase()}: ${log.msg}`;
            
                        switch (log.level) {
                            case 'error':
                                return console.error(`${logLine}\nException: ${log.err.stack}`);
                            
                            case 'warn':
                                return console.warn(logLine);
            
                            default:
                                return console.log(logLine); 
                        }
                    }
                },
                type: 'raw'
            }

        default:
            console.error(`FATAL - Incorrect appender "${configuration.loggerAppender}"`)
    }
}