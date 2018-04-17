const path = require('path');
const fs = require('fs');

function timeout (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, delay)
    });        
}

function writeFileSync (name, data) {
    fs.writeFileSync(path.resolve(__dirname, name), `module.exports=${JSON.stringify(data)}`);
}

module.exports = {
    writeFileSync: writeFileSync,
    timeout: timeout
};