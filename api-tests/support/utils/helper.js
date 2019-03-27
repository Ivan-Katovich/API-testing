module.exports = {
    prepareCollections(collection, baseUrl){
        const keys = Object.keys(collection);
        keys.forEach((key) => {
            if (!collection[key].url.match(/http/)){
                collection[key].url = `${baseUrl}${collection[key].url}`;
            }
            if (collection[key].body && typeof collection[key].body === 'object') {
                collection[key].body = JSON.stringify(collection[key].body);
            }
        });
    },
    sleep(timeout) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
};