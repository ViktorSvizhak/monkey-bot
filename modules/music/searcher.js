const https = require('https');
const logger = require('../common/logger')('searcher');
const queryStringBuilder = require('../common/queryStringBuilder');

module.exports = {
    searchVideosByParams: (params, songsCount, callback) => {
        if (Array.isArray(params))
        {
            params = params.join(' ');
        } 

        const queryString = new queryStringBuilder()
            .appendYoutubeToken()
            .appendParams(params)
            .appendType('video')
            .appendPartType('snippet')
            .appendMaxResults(songsCount)
            .getQueryString();

        const options = createSearchGetRequest('search', queryString)

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

    searchPlaylistsByParams: (params, playlistsCount, nextPageToken, callback) => {
        if (Array.isArray(params))
        {
            params = params.join(' ');
        } 

        const _queryStringBuilder = new queryStringBuilder()
            .appendYoutubeToken()
            .appendParams(params)
            .appendType('playlist')
            .appendPartType('snippet')
            .appendMaxResults(playlistsCount);

        if(nextPageToken) {
            _queryStringBuilder.appendPageToken(nextPageToken);
        }

        const options = createSearchGetRequest('search', _queryStringBuilder.getQueryString())

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
        const _queryStringBuilder = new queryStringBuilder()
            .appendYoutubeToken()
            .appendPartType('snippet')
            .appendPlaylistId(playlistId);
        
        if(nextPageToken) {
            _queryStringBuilder.appendPageToken(nextPageToken);
        }

        const options = createSearchGetRequest('playlistItems', _queryStringBuilder.getQueryString());

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

function createSearchGetRequest(endpoint, queryString) {
    return {
        hostname: 'youtube.googleapis.com',
        path: `/youtube/v3/${endpoint}?${queryString}`,
        method: 'GET'
    };
}