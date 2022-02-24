module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        34: "8.2rem",
        90: "22rem",
      },
      height: {
        footer: "calc(100vh - 7.5rem)",
        102: "34rem",
      },
      maxHeight:{
        '128': '32rem',
      },
      spacing:{
        18: "4.5rem"
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
