
var fs = require('fs');
var TTFReader = require('../main').TTFReader;
var util = require('./util');



function readttf(file) {
    var data = fs.readFileSync(file);
    var buffer = util.toArrayBuffer(data);
    var ttfObject  = new TTFReader().read(buffer);
    console.log(ttfObject);
}

readttf('../test/font/iconfont.ttf');
