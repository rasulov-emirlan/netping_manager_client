module.exports = {
	content: [
		"./pages/**/*.{html,jsx}",
		"./src/components/**/*.{html,jsx}",
		"./src/**/*.jsx",
	],
	theme: {
		extend: {
			boxShadow: {
				custom: "0px 0px 8px rgba(0, 0, 0, 0.25)",
				btnShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
			},
			colors: {
				bgWarning: "rgb(50, 50, 50, 0.5);",
			},
		},
	},
	plugins: [],
};
