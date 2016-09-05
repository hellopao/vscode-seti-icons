"use strict";

const fs = require('fs');

const tplFile = fs.readFileSync('./icon.tpl', "utf-8");

// program language file
var langFiles = fs.readdirSync('./fileicons/images/lang');

var langIconDefMap = {};
var langIconRefMap = {};

langFiles.forEach(file => {
    const filename = file.replace(/\..*$/,'');

    const langDefKey = `_${filename}_file`;
    langIconDefMap[langDefKey] = {
        iconPath: `./images/lang/${file}`

    };
    langIconRefMap[filename] = langDefKey;
});

// common file extension
var commonFiles = fs.readdirSync('./fileicons/images/common');

var commonIconDefMap = {};
var commonIconRefMap = {};

commonFiles.forEach(file => {
    const filename = file.replace(/\..*$/,'');

    const commonDefKey = `_${filename}_file`;
    commonIconDefMap[commonDefKey] = {
        iconPath: `./images/common/${file}`
    };
    commonIconRefMap[filename] = commonDefKey;
});

// config file
var configFiles = fs.readdirSync('./fileicons/images/config');

var configIconDefMap = {};
var configIconRefMap = {};

configFiles.forEach(file => {
    const filename = file.replace(/\.[^\.]*$/,'').replace(/^\./,'');

    const configDefKey = `_${filename}_file`;
    configIconDefMap[configDefKey] = {
        iconPath: `./images/config/${file}`
    };
    configIconRefMap[filename] = configDefKey;
});

// special file
var specialFiles = fs.readdirSync('./fileicons/images/special');

var specialIconDefMap = {};
var specialIconRefMap = {};

specialFiles.forEach(file => {
    const filename = file.replace(/\..*$/,'').replace(/^\./,'');

    const specialDefKey = `_${filename}_file`;
    specialIconDefMap[specialDefKey] = {
        iconPath: `./images/special/${file}`
    };
    specialIconRefMap[filename] = specialDefKey;
});

const targetFileContent = tplFile
    .replace("__lang_file_icon_def_placeholder", JSON.stringify(langIconDefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__lang_file_icon_ref_placeholder", JSON.stringify(langIconRefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__common_file_icon_def_placeholder", JSON.stringify(commonIconDefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__common_file_icon_ref_placeholder", JSON.stringify(commonIconRefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__config_file_icon_def_placeholder", JSON.stringify(configIconDefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__config_file_icon_ref_placeholder", JSON.stringify(configIconRefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__special_file_icon_def_placeholder", JSON.stringify(specialIconDefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__special_file_icon_ref_placeholder", JSON.stringify(specialIconRefMap).replace(/^{/, "").replace(/}$/, ""))

fs.writeFileSync("./fileicons/seti.json", targetFileContent);