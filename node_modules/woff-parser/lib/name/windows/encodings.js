module.exports = function (encoding) {
	switch (encoding) {
		case 0x0001: return "utf-16be";
		case 0x0002: return "shiftjis";
		case 0x0004: return "big5";
		case 0x000a: return "utf-16be";
	}
	return "ascii";
};