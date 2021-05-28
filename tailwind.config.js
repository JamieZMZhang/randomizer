module.exports = {
	purge: {
		preserveHtmlElements: false,
		content: ['./index.html', './src/**/*.{jsx,tsx}'],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			keyframes: {
				slideFromRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0%)' },
				},
			},
			animation: {
				slideFromRight: 'slideFromRight .3s',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	important: true,
};
