module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        90: "22rem",
      },
      height: {
        footer: "calc(100vh - 7.5rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
