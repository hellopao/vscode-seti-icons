# woff-parser [![Build Status][ci-img]][ci]

WOFF font parser

[ci-img]:  https://travis-ci.org/andyjansson/woff-parser.svg
[ci]:      https://travis-ci.org/andyjansson/woff-parser

## Installation

```js
npm install woff-parser
```

## Usage 

```js
var fs = require('fs');
var parser = require('woff-parser');

fs.readFile('font.woff', function (err, contents) {
	if (err) throw err;
	parser(contents).then(function (result) {
		console.log(result);
	});
});
```

Outputs:

```json
{
	...
	"name": {
		"format": 0,
		"nameRecords": {
			"English": {
				"fontFamily": "Source Sans Pro",
				"fontSubFamily": "Regular",
				"uniqueFontId": "1.050;ADBE;SourceSansPro-Regular;ADOBE",
				"fullName": "Source Sans Pro",
				"version": "Version 1.050;PS Version 1.000;hotconv 1.0.70;makeotf.lib2.5.5900",
				"postscriptName": "SourceSansPro-Regular",
				"licenseUrl": "http://www.adobe.com/type/legal.html"
			}
		}
	}
	...
}
```