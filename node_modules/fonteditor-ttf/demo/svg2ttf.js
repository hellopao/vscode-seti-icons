
var fs = require('fs');
var TTFWriter = require('../main').TTFWriter;
var svg2ttfobject = require('../main').svg2ttfobject;

function getEmpty() {
    var data = fs.readFileSync('./empty.json');
    return JSON.parse(data);
}

var util = require('./util');


var svg = fs.readFileSync('../test/font/iconfont.svg');
var emptyTTFObject = getEmpty();
ttfObject = svg2ttfobject(String(svg));

emptyTTFObject.glyf = ttfObject.glyf;

var ttfBuffer = new TTFWriter().write(emptyTTFObject);
// 写ttf
fs.writeFileSync('./output/iconfont-svg2ttf.ttf', util.toBuffer(ttfBuffer));
