"use strict";

const path = require('path');
const fs = require('./fs');

const svgFile = path.join(__dirname, "../fonts/seti.svg");
const glyphFile = path.join(__dirname, "../config/glyph.json");

fs.readFile(svgFile)
    .then(data => {
        var glyphMap = {};
        data.replace(/glyph-name="([^\"]+)"\s+unicode="&#x([^;]+);"/g, (str, key, value) => {
            glyphMap[key] = value;
        });
        return glyphMap
    })
    .then(data => {
        return fs.writeFile(glyphFile, JSON.stringify(data));
    })

