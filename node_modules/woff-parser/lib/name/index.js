var iconv = require('iconv-lite');
var mac = require('./macintosh');
var win = require('./windows');
var tableNames = require('./names.js');

module.exports = function (data) {
	var name = {
		format: data.readUInt16BE(0)
	};
	
	var count = data.readUInt16BE(2);
	var stringOffset = data.readUInt16BE(4);
	var storage = data.slice(stringOffset);
	
	var nameRecords = {};
	for (var i = 0; i < count; i++) {
		var platformId = data.readUInt16BE(6 + (12 * i));
		var encodingId = data.readUInt16BE(8 + (12 * i));
		var languageId = data.readUInt16BE(10 + (12 * i));
		var nameId = data.readUInt16BE(12 + (12 * i));
		var nrLength = data.readUInt16BE(14 + (12 * i));
		var nrOffset = data.readUInt16BE(16 + (12 * i));	
	
		var nameData = storage.slice(nrOffset, nrOffset + nrLength);
		var key = tableNames[nameId] || nameId;
		var lang, decodedData;

		switch (platformId) {
			case 0x0000:
				decodedData = iconv.decode(nameData, 'utf-16be');
				break;
			case 0x0001:
				lang = mac.languages(languageId);
				decodedData = iconv.decode(nameData, mac.encodings(encodingId));
				break;
			case 0x0003:
				lang = win.languages(languageId);
				decodedData = iconv.decode(nameData, win.encodings(encodingId));
				break;
		}
		if (nameRecords[lang] === undefined) {
			nameRecords[lang] = {};
		}
		nameRecords[lang][key] = decodedData;
	}
	name["nameRecords"] = nameRecords;
	
	var offset = count * 12;
	
	if (name.format !== 0x0000) {
		var langTagCount = data.readUInt16BE(6 + offset);
		var langTagRecords = [];
		for (var i = 0; i < langTagCount; i++) {
			var length = data.readUInt16BE(8 + offset + (4 * i));
			var offset = data.readUInt16BE(10 + offset + (4 * i));
			langTagRecords.push(
				iconv.decode(storage.slice(offset, offset + length), 'utf-16be')
			);
		}
		name["langTagRecords"] = langTagRecords;
	}
	return name;
};