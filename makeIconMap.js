"use strict";

const fs = require('fs');

const tplFile = fs.readFileSync('./icon.tpl', "utf-8");

const langs = [
    "c", "coffee", "cpp", "cs", "css", "csv", "docker", "ejs", "go", "gradle", "html", "jade", "java", "jpg", "js", "json", "jsx", "less", "lua", "md", "pdf",
     "perl","php","pug","py","ruby","rust","sass","stylus","svg","swift","ts","twig","vala","xml","yml"
];

var langIconDefMap = {};
var langIconRefMap = {};

langs.forEach(lang => {
    const langDefKey = `_${lang}_file`;
    langIconDefMap[langDefKey] = {
        iconPath: `./images/${lang}.svg`
    };
    langIconRefMap[lang] = langDefKey;
});

const targetFileContent = tplFile
    .replace("__lang_file_icon_def_placeholder", JSON.stringify(langIconDefMap).replace(/^{/, "").replace(/}$/, ""))
    .replace("__lang_file_icon_ref_placeholder", JSON.stringify(langIconRefMap).replace(/^{/, "").replace(/}$/, ""))

fs.writeFileSync("./fileicons/seti.json", targetFileContent);