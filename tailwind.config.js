/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#284C71",
        bgLightGrey: "#F5F5F5",
        letters: "#1E1E1E",
        bgGray: "#E8E8E8"
      },
      boxShadow: {
        'pronounced': '100px 10px 2px rgba(0, 0, 0, 1) ', // Increased opacity and blur radius
      },
      fontFamily: {
        'himnRegular': ['MarkaziText-Regular'],
        'himnBold': ['MarkaziText-Bold'],
        'himnSemiBold': ['MarkaziText-SemiBold'],
        'himnMedium': ['MarkaziText-Medium'],
      },
    },
  },
  plugins: [],
}