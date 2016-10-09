module.exports = function (type) {
	if (type & 0x0001) return "Reserved";
	if (type & 0x0002) return "Restricted License embedding";
	if (type & 0x0004) return "Preview & Print embedding";
	if (type & 0x0008) return "Editable embedding";
	if (type & 0x0111) return "Reserved";
	if (type & 0x0100) return "No subsetting";
	if (type & 0x0200) return "Bitmap embedding only";
	if (type >= 10 && type <= 15) return "Reserved";
	return "Installable Embedding";
};