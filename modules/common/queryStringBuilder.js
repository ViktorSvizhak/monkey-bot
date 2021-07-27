const configuration = require('../../configurations/configuration');

module.exports = class {
    constructor(endpoint) {
        this.queryString = `${endpoint}?`;
        this.paramsCount = 0;
    }

    append(key, value) {
        this.queryString += `${this.paramsCount++ === 0 ? '' : '&'}${key}=${value}`;
    }

    appendYoutubeToken() {
        if(this.key)
        {
            return this;
        }

        this.key = configuration.youtubeToken;
        this.append('key', this.key);

        return this;
    }
    
    appendParams(params) {
        if(this.params)
        {
            return this;
        }

        this.params = params;
        this.append('q', encodeURI(this.params));

        return this;
    }
    
    appendType(type) {
        if(this.type)
        {
            return this;
        }

        this.type = type;
        this.append('type', this.type);

        return this;
    }

    appendPartType(partType) {
        if(this.partType)
        {
            return this;
        }

        this.partType = partType;
        this.append('part', this.partType);

        return this;
    }

    appendMaxResults(maxResults) {
        if(this.maxResults)
        {
            return this;
        }

        this.maxResults = maxResults;
        this.append('maxResults', this.maxResults);

        return this;
    }

    appendPlaylistId(playlistId) {
        if(this.playlistId)
        {
            return this;
        }

        this.playlistId = playlistId;
        this.append('playlistId', this.playlistId);

        return this;
    }

    appendPageToken(pageToken) {
        if(this.pageToken)
        {
            return this;
        }

        this.pageToken = pageToken;
        this.append('pageToken', this.pageToken);

        return this;
    }
}