const colors = require("./colors");

module.exports = {
  content: ["front-src/**/*.svelte", "front-src/**/*.js"],
  safelist: [{ pattern: /^rounded-/ }],
  theme: {
    extend: {
      colors,
      boxShadow: {
        none: "none",
      },
      transitionDuration: {
        fast: "150ms",
      },
    },
    borderRadius: {
      none: "0",
      sm: "2px",
      DEFAULT: "4px",
      md: "4px",
      lg: "4px",
      xl: "4px",
      half: "50%",
      full: "100%",
    },
  },
  plugins: [],
};
