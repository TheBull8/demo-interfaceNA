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
              "primary-focus": "#EE5959",
            },
          },
        ],
      },
    plugins: [require("daisyui")],
}