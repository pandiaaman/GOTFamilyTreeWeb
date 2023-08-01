/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gotwall: "url('../resources/gotwallhome.jpg')",
      },
    },
  },
  plugins: [],
};
