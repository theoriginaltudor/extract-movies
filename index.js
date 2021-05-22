const { resolve } = require('path');
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getFiles(res);
        } else {
            yield res;
        }
    }
}

const acceptedExtensions = ['mp4', 'mov', 'mkv', 'flv', 'avi', 'wmv', 'avchd', 'webm', 'h264', 'm4p', 'm4a', 'm4v'];

(async () => {
    for await (const f of getFiles('../everything')) {
        const fileName = f.split('/').pop();

        const extension = fileName.slice(fileName.lastIndexOf('.')+1);

        if (acceptedExtensions.includes(extension.toLowerCase())) {
            console.log(fileName);
        }
    }
})()
