"use strict";

const path = require('path');
const fs = require('./fs');

fs.readFile(path.join(__dirname,'../fonts/seti.svg'))
    .then(data => {
        const glyph = {};
        data.replace(/glyph-name="([^\"]+)"\s+unicode="&#x([^;]+);"/g, (str, name, code) => {
            glyph[name] = `\\${code}`;
        })        
        return glyph
    })
    .then(glyph => {
        return fs.writeFile(path.join(__dirname, '../config/glyphs.json'), JSON.stringify(glyph));
    })
    .catch(err => {
        console.log(err)
    })

// fs.readFile(path.join(__dirname,'../fonts/seti.svg'))
//     .then(data => {
//         var i = 0;
//         return data.replace(/unicode="&#x([^;]+);"/g, (str, code) => {
//             i++;
//             let num = i.toString(16);
//             if (num.length === 1) {
//                 num = `00${num}`
//             } else if (num.length === 2) {
//                 num = `0${num}`
//             }
//             return `unicode="&#xe${num};"`
//         })        
//     })
//     .then(data => {
//         return fs.writeFile(path.join(__dirname, "../fonts/seti.svg"),JSON.stringify(data))
//     })