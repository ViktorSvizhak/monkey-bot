const https = require('https');
const logger = require('../common/logger');
const queryStringBuilder = require('../common/queryStringBuilder');

module.exports = {
    searchVideosByParams: (params, songsCount, callback) => {
        if (Array.isArray(params))
        {
            params = params.join(' ');
        } 

        const queryString = new queryStringBuilder('search')
            .appendYoutubeToken()
            .appendParams(params)
            .appendType('video')
            .appendPartType('snippet')
            .appendMaxResults(songsCount)
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
    },

    searchPlaylistsByParams: (params, playlistsCount, callback) => {
        if (Array.isArray(params))
        {
            params = params.join(' ');
        } 

        const queryString = new queryStringBuilder('search')
            .appendYoutubeToken()
            .appendParams(params)
            .appendType('playlist')
            .appendPartType('snippet')
            .appendMaxResults(playlistsCount)
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
    },

    getPlaylistItems: (playlistId, nextPageToken, callback) => {
        const _queryStringBuilder = new queryStringBuilder('playlistItems')
            .appendYoutubeToken()
            .appendPartType('snippet')
            .appendPlaylistId(playlistId);
        
        if(nextPageToken) {
            _queryStringBuilder.appendPageToken(nextPageToken);
        }

        const options = createSearchGetRequest()
        options.path += _queryStringBuilder.queryString;

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
        path: '/youtube/v3/',
        method: 'GET'
    };
}