var Promise = global.Promise || require('es6-promise').Promise;
var zlib = require('zlib');

module.exports = function (buf, origLength, cb) {
	return new Promise(function (resolve, reject) {
		if (buf.length == origLength) cb(buf.toString(), resolve, reject);
		else {
			zlib.inflate(buf, function (err, contents) {
				if (err) reject()
				cb(contents, resolve, reject);
			});
		}
	});
}