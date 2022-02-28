module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        60: 60,
      },
      width: {
        34: "8.5rem",
        90: "22rem",
      },
      height: {
        footer: "calc(100vh - 7.5rem)",
        102: "34rem",
      },
      maxHeight: {
        128: "32rem",
      },
      spacing: {
        18: "4.5rem",
      },
      fontFamily: {
        "Titillium-Web": ["Saira Condensed", "sans-serif"],
        Hubballi: ["Hubballi", "cursive"],
        "Work-Sans": ["Work Sans", " sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
