const lazyModule = require('./lazyModule');

const modules = new Map();

module.exports = (moduleName) => {
    const absolutePath = getAbsolutePath(moduleName);
    let module = modules.get(absolutePath);

    if(!module) {
        module = new lazyModule(absolutePath);
        modules.set(absolutePath, module);
    }
    
    return module;
}

function getAbsolutePath(moduleName) {
    //remove symbols '/' and '.' from start of string
    moduleName = moduleName.replace(/^[\.\/]+/, '')
    
    //modules load from 'lazyModule.js' file location 
    return `../../${moduleName}`;
}