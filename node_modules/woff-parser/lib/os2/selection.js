module.exports = function (selection) {
	return {
		italic: (selection & 0x0001) > 0,
		underscore: (selection & 0x0002) > 0,
		negative: (selection & 0x0004) > 0,
		outlined: (selection & 0x0008) > 0,
		bold: (selection & 0x0010) > 0,
		regular: (selection & 0x0020) > 0,
		useTypoMetrics: (selection & 0x0030) > 0,
		wws: (selection & 0x0040) > 0,
		oblique: (selection & 0x0050) > 0
	};
};