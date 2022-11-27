/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '480px',
				md: '768px',
				lg: '1024px',
				xl: '1440px',
			},
			colors: {
				ourGreen: '#45B64C',
				ourYellow: '#E9D327',
			},
		},
	},
	plugins: [],
};
