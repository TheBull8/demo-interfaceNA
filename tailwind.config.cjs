module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  //...
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#EE71A9",
          "primary-focus": "#EA4891",
          "primary-text": "#CCCBC8"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}