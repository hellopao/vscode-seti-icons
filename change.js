"use strict";

const fs = require('fs');

const readdir = function(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err ,dirs) => {
            if (err) {
                reject(err);
            } else {
                resolve(dirs);
            }
        })
    })
};

const readFile = function(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
};

const writeFile = function(file, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
};

readdir('./fileicons/images')
    .then(dirs => {
        return Promise.all(dirs.filter(dir => !/\..*$/.test(dir)).map(dir => {
            return readdir(`./fileicons/images/${dir}`)
                .then(files => {
                    return Promise.all(files.filter(file => /\.svg$/.test(file)).map(file => {
                        const filename = `./fileicons/images/${dir}/${file}`
                        return readFile(filename)
                            .then(data => {
                                return {filename, data}
                            })
                    }))
                })
        }))
    })
    .then(cates => {
        cates.forEach(files => {
            files.forEach(file => {
                let {filename, data} = file;
                data = data.replace(/viewBox="\d \d (\d+) (\d+)" enable-background="new \d \d (\d+) (\d+)"/, 'viewBox="2 2 24 24" enable-background="new 2 2 24 24"')
                writeFile(filename, data);
            })
        })
        
    })
    .catch(err => {
        console.log(err)
    })