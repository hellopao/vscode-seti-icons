module.exports = function (encoding) {
	switch (encoding) {
		case 0: return "macroman";
		case 5: return "macgreek";
		case 7: return "maccyrillic";
		case 21: return "macthai";
		case 29: return "maccenteuro";
	}
	return null;
};