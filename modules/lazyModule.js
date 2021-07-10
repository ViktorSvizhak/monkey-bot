module.exports = class {
    constructor(moduleName) {
        this._moduleName = moduleName;
    }

    get module() {
        if(!this._module)
        {
            this._module = require(this._moduleName);
        }
        
        return this._module
    }
}