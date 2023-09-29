module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  //...
  theme: {
    extend: {
      colors: {
        "primary": "#3394EE",
        "primary-focus": "#1173D0",
        "primary-light": "#F6B6D3",
        "primary-text": "#666564",
        "primary-gray": "#807F7D",
        "border-gray": "#B2B1AE",
        "light-gray": "#F5F4EF",
        "light-yellow": "#FFFFCF",
        "light-green": "#C9F7C3",
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