
var fs = require('fs');
var OTFReader = require('../main').OTFReader;
var util = require('./util');



function readttf(file) {
    var data = fs.readFileSync(file);
    var buffer = util.toArrayBuffer(data);
    var fontObject  = new OTFReader().read(buffer);
    console.log(fontObject);
}

readttf('../test/font/BalladeContour.otf');
