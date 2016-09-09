"use strict";

const path = require('path');
const fs = require('./fs');

const extIcons = require('../config/icons/ext.json');
const commonIcons = require('../config/icons/common.json');
const filenameIcons = require('../config/icons/filename.json');
const glyphMap = require('../config/glyph.json');

const iconTplFile = path.join(__dirname, "../config/icon.tpl");
const iconConfigFile = path.join(__dirname, "../seti.json");

String.prototype.trimWrap = function () {
    return this.replace(/^{/, '').replace(/}$/, '');
};

fs.readFile(iconTplFile)
    .then(data => {
        [{
            name: "ext",
            icons: extIcons
        },{
            name: "filename",
            icons: filenameIcons
        },{
            name: "common",
            icons: commonIcons
        }].forEach(cat => {
            let iconDefMap = {};
            let iconRefMap = {};
            let lightIconRefMap = {};
            Object.keys(cat.icons).forEach(icon => {
                const key = `__${icon}_icon`;
                const lightKey = `${key}_light`;

                iconRefMap[icon] = key;
                lightIconRefMap[icon] = lightKey;

                if (typeof cat.icons[icon] === "string") {
                    const glyph = glyphMap[cat.icons[icon]];
                    iconDefMap[key] = {
                        fontCharacter: glyph.code,
                    };
                    iconDefMap[lightKey] = {
                        fontCharacter: glyph.code,
                    };

                    glyph.color.light && (iconDefMap[lightKey].fontColor = glyph.color.light);
                    glyph.color.dark && (iconDefMap[key].fontColor = glyph.color.dark);
                } else {
                    iconDefMap[key] = cat.icons[icon];
                    iconDefMap[lightKey] = cat.icons[icon];
                }
            });

            data = data
                .replace(new RegExp(`__${cat.name}_icon_def_placeholder`,'g'), JSON.stringify(iconDefMap).trimWrap())
                .replace(new RegExp(`__${cat.name}_icon_ref_placeholder`,'g'), JSON.stringify(iconRefMap).trimWrap())
                .replace(new RegExp(`__${cat.name}_light_icon_ref_placeholder`,'g'), JSON.stringify(lightIconRefMap).trimWrap())
        })
        
        return data;
    })
    .then(data => {
        return fs.writeFile(iconConfigFile, data)
    })