const https = require('https');
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
            console.log(`statusCode: ${response.statusCode}`);
          
            response.on('data', (chunk) => {
                data += chunk;
            })

            response.on('end', () => {
                const result = JSON.parse(data);
                console.log('Request ended');
                callback(result);
              });
            
        });

        request.on('error', error => {
            console.error(error)
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