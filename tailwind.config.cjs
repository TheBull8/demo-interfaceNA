module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  //...
  theme: {
    extend: {
      colors: {
        "primary": "#3394EE",
        "primary-focus": "#EA4891",
        "primary-light": "#F6B6D3",
        "primary-text": "#CCCBC8",
        "primary-gray": "#807F7D",
        "light-gray": "#E5E4E0"
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#3394EE",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}