
var fs = require('fs');
var OTFReader = require('../main').OTFReader;
var otf2ttfobject = require('../main').otf2ttfobject;
var TTFWriter = require('../main').TTFWriter;
var util = require('./util');



function readttf(file) {
    var data = fs.readFileSync(file);
    var buffer = util.toArrayBuffer(data);
    var fontObject  = new OTFReader().read(buffer);
    return fontObject;
}

var fontObject = readttf('../test/font/BalladeContour.otf');
var ttfBuffer = new TTFWriter().write(otf2ttfobject(fontObject));
// 写ttf
fs.writeFileSync('./output/BalladeContour.ttf', util.toBuffer(ttfBuffer));


