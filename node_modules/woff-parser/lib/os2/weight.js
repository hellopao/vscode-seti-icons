module.exports = function (weight) {
	switch (weight) {
		case 100: return { value: 100, description: "Thin" };
		case 200: return { value: 200, description: "Extra-light" };
		case 300: return { value: 300, description: "Light" };
		case 400: return { value: 400, description: "Normal" };
		case 500: return { value: 500, description: "Medium" };
		case 600: return { value: 600, description: "Semi-bold" };
		case 700: return { value: 700, description: "Bold" };
		case 800: return { value: 800, description: "Extra-bold" };
		case 900: return { value: 900, description: "Black" };
	};
};
