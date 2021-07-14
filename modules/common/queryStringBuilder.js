const configuration = require('../../configurations/configuration');

module.exports = class {
    constructor() {
        this.queryString = '?';
        this.paramsCount = 0;
    }

    append(key, value) {
        this.queryString += `${this.paramsCount++ === 0 ? '' : '&'}${key}=${value}`;
    }

    appendToken() {
        if(this.token)
        {
            return this;
        }

        this.token = configuration.youtubeToken;
        this.append('key', this.token);

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
}