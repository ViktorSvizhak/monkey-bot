const https = require('https');
const logger = require('./logger');
const queryStringBuilder = require('./queryStringBuilder');

module.exports = {
    searchVideosByParams: (params, callback) => {
        if (Array.isArray(params))
        {
            params = params.join(' ');
        } 

        const queryString = new queryStringBuilder()
            .appendToken()
            .appendParams(params)
            .appendType('video')
            .appendPartType('snippet')
            .queryString;

        const options = createSearchGetRequest()
        options.path += queryString;

        let data = '';

        const request = https.get(options, (response) => {
            response.on('data', (chunk) => {
                data += chunk;
            })

            response.on('end', () => {
                const result = JSON.parse(data);
                callback(result);
              });
            
        });

        request.on('error', ex => {
            logger.error(ex, 'Failed to search song');
          })
          
        request.end();
    }
}

function createSearchGetRequest() {
    return {
        hostname: 'youtube.googleapis.com',
        path: '/youtube/v3/search',
        method: 'GET'
    };
}