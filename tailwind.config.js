/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./toastConfig.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary : "#3182ce"
      }
    },
  },
  plugins: [],
}