module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  //...
  theme: {
    extend: {
      colors: {
        "primary": "#EE71A9",
        "primary-focus": "#EA4891",
        "primary-light": "#F6B6D3",
        "primary-text": "#CCCBC8"
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "primary": "#EE71A9",
          "primary-focus": "#EA4891",
          "primary-light": "#F6B6D3",
          "primary-text": "#CCCBC8"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}