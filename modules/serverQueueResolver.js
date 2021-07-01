const queue = new Map();

module.exports = {
    get: (guild) => {
        return queue.get(guild.id);
    },
    set: (guild, queueContruct) => {
        return queue.set(guild.id, queueContruct);
    },
    delete: (guild) => {
        return queue.delete(guild.id);
    }
}