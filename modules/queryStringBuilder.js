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

        this.token = process.env.youtube_token;
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
}