const cashe = new Map();

module.exports = {
    put: (key, object, time) => {
        cashe.set(key, object);
    },

    get: (key) => {
        cashe.get(key);
    }
}