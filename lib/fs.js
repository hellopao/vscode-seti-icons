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

exports.readdir = readdir;
exports.readFile = readFile;
exports.writeFile = writeFile;