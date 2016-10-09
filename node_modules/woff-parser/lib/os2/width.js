module.exports = function (width) {
	switch (width) {
		case 1: return { value: 1, description: "Ultra-condensed", percentage: 50 };
		case 2: return { value: 2, description: "Extra-condensed", percentage: 62.5 };
		case 3: return { value: 3, description: "Condensed", percentage: 75 };
		case 4: return { value: 4, description: "Semi-condensed", percentage: 87.5 };
		case 5: return { value: 5, description: "Medium (normal)", percentage: 100 };
		case 6: return { value: 6, description: "Semi-expanded", percentage: 112.5 };
		case 7: return { value: 7, description: "Expanded", percentage: 125 };
		case 8: return { value: 8, description: "Extra-expanded", percentage: 150 };
		case 9: return { value: 9, description: "Ultra-expanded", percentage: 200 };
	}
};
