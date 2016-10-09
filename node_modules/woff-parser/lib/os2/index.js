var panose = require('./panose.js');
var weight = require('./weight.js');
var width = require('./width.js');
var type = require('./type.js');
var familyClass = require('./class.js');
var selection = require('./selection.js');
var unicodeRange1 = require('./unicoderange/unicoderange1.js');
var unicodeRange2 = require('./unicoderange/unicoderange2.js');
var unicodeRange3 = require('./unicoderange/unicoderange3.js');
var unicodeRange4 = require('./unicoderange/unicoderange4.js');
var codePageRange1 = require('./codepagerange/codepagerange1.js');
var codePageRange2 = require('./codepagerange/codepagerange2.js');

module.exports = function (data) {
	var os2 = {
		version: data.readUInt16BE(0),
		averageCharacterWidth: data.readInt16BE(2),
		weight: weight(data.readUInt16BE(4)),
		width: width(data.readUInt16BE(6)),
		type: type(data.readUInt16BE(8)),
		subscript: {
			horizontalFontSize: data.readInt16BE(10),
			verticalFontSize: data.readInt16BE(12),
			horizontalOffset: data.readInt16BE(14),
			verticalOffset: data.readInt16BE(16)
		},
		superscript: {
			horizontalFontSize: data.readInt16BE(18),
			verticalFontSize: data.readInt16BE(20),
			horizontalOffset: data.readInt16BE(22),
			verticalOffset: data.readInt16BE(24)
		},
		strikeout: {
			width: data.readInt16BE(26),
			position: data.readInt16BE(28)
		},
		fontFamilyClass: familyClass(data.readInt16BE(30)),
		panose: panose(data.slice(32, 42)),
		unicodeRange1: unicodeRange1(data.readUInt32BE(42)),
		unicodeRange2: unicodeRange2(data.readUInt32BE(46)),
		unicodeRange3: unicodeRange3(data.readUInt32BE(50)),
		unicodeRange4: unicodeRange4(data.readUInt32BE(54)),
		fontVendorID: data.slice(58, 62).toString(),
		selection: selection(data.readUInt16BE(62)),
		firstCharacterIndex: data.readUInt16BE(64),
		lastCharacterIndex: data.readUInt16BE(66),
		typographicAscender: data.readInt16BE(68),
		typographicDescender: data.readInt16BE(70),
		typographicLinegap: data.readInt16BE(72),
		windowsAscent: data.readUInt16BE(74),
		windowsDescent: data.readUInt16BE(76)
	};
	
	if (data.length > 78) {
		os2["codePageRange1"] = codePageRange1(data.readUInt32BE(78));
		os2["codePageRange2"] = codePageRange2(data.readUInt32BE(82));
	}

	if (data.length > 86) {
		os2["xHeight"] = data.readInt16BE(86);
		os2["capHeight"] = data.readInt16BE(88);
		os2["defaultCharacter"] = data.readUInt16BE(90);
		os2["breakCharacter"] = data.readUInt16BE(92);
		os2["maxContent"] = data.readUInt16BE(94);
	}
	
	if (data.length > 96) {
		os2["lowerOpticalPointSize"] = data.readUInt16BE(96);
		os2["upperOpticalPointSize"] = data.readUInt16BE(98);
	}
	return os2;
};