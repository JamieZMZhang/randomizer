module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
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
				slideFromRight: 'slideFromRight 1s',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	important: true,
};
