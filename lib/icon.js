"use strict";

const path = require('path');
const fs = require('./fs');

const extIcons = require('../config/icons/ext.json');
const commonIcons = require('../config/icons/common.json');
const filenameIcons = require('../config/icons/filename.json');
const langIcons = require('../config/icons/lang.json');
const glyphs = require('../config/glyphs.json');
const colors = require('../config/colors.json');

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
        }, {
                name: "filename",
                icons: filenameIcons
            }, {
                name: "common",
                icons: commonIcons
            }, {
                name: "lang",
                icons: langIcons
            }].forEach(cat => {
                let iconDefMap = {};
                let iconRefMap = {};
                let lightIconRefMap = {};

                Object.keys(cat.icons).forEach(item => {
                    const key = `__${item}_icon`;
                    const lightKey = `${key}_light`;

                    let icon = cat.icons[item];
                    let color = colors[icon];

                    if (["folderNames", "folderNamesExpanded"].indexOf(item) > -1) {
                        let folderIconRefMap = {};
                        let folderLightIconRefMap = {};
                        
                        Object.keys(icon).forEach(folder => {
                            let key = `__${folder}_icon`;
                            if (item === "folderNamesExpanded") {
                                key = `__${folder}_open_icon`;
                            }
                            const lightKey = `${key}_light`;

                            const folderIcon = icon[folder];
                            color = colors[folderIcon];

                            const glyph = glyphs[folderIcon];
                            iconDefMap[key] = {
                                fontCharacter: glyph,
                            };;
                            iconDefMap[lightKey] = {
                                fontCharacter: glyph,
                            };;

                            folderIconRefMap[folder] = key;
                            folderLightIconRefMap[folder] = lightKey;

                            try {
                                color.light && (iconDefMap[lightKey].fontColor = color.light);
                                color.dark && (iconDefMap[key].fontColor = color.dark);
                            } catch (err) {
                                console.log(icon)
                            }
                        });

                        iconRefMap[item] = folderIconRefMap;
                        lightIconRefMap[item] = folderLightIconRefMap;
                    } else {
                        iconRefMap[item] = key;
                        lightIconRefMap[item] = lightKey;

                        if (typeof icon === "string") {
                            const glyph = glyphs[icon];
                            iconDefMap[key] = {
                                fontCharacter: glyph,
                            };
                            iconDefMap[lightKey] = {
                                fontCharacter: glyph,
                            };

                            try {
                                color.light && (iconDefMap[lightKey].fontColor = color.light);
                                color.dark && (iconDefMap[key].fontColor = color.dark);
                            } catch (err) {
                                console.log(icon)
                            }
                        } else {
                            iconDefMap[key] = icon;
                            iconDefMap[lightKey] = icon;
                        }
                    }
                });

                data = data
                    .replace(new RegExp(`__${cat.name}_icon_def_placeholder`, 'g'), JSON.stringify(iconDefMap).trimWrap())
                    .replace(new RegExp(`__${cat.name}_icon_ref_placeholder`, 'g'), JSON.stringify(iconRefMap).trimWrap())
                    .replace(new RegExp(`__${cat.name}_light_icon_ref_placeholder`, 'g'), JSON.stringify(lightIconRefMap).trimWrap())
            })

        return data;
    })
    .then(data => {
        return fs.writeFile(iconConfigFile, data)
    })
    .catch(err => {
        console.log(err);
    })