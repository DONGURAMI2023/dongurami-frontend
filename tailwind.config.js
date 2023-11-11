/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xs: "320px",
			},
			colors: {
				// you can use it like this: bg-primary, bg-gray-1
				primary: "#8EAE57",
				secondary: "#A7A9A3",
			},
			animation: {
				fade: "fade 1s ease-in-out",
			},
			keyframes: () => ({
				fade: {
					"0%": { opacity: 0 },
					"100%": { opacity: 100 },
				},
			}),
		},
	},
	// eslint-disable-next-line
	plugins: [require("tailwind-scrollbar-hide")],
};
