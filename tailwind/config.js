/**
 * MARV Tailwind Configuration - Modern Glass Theme
 * Version: 2.0
 */

const tokens = require("./design-tokens");

module.exports = {
  content: ["front-src/**/*.svelte", "front-src/**/*.js"],
  safelist: [
    { pattern: /^rounded-/ },
    { pattern: /^bg-/ },
    { pattern: /^text-/ },
    { pattern: /^border-/ },
    { pattern: /^shadow-/ },
    { pattern: /^animate-/ },
  ],
  theme: {
    extend: {
      // Colors from design tokens
      colors: tokens.colors,

      // Box shadows (elevation system)
      boxShadow: tokens.boxShadow,

      // Backdrop blur for glassmorphism
      backdropBlur: tokens.backdropBlur,

      // Transitions
      transitionDuration: tokens.transitionDuration,
      transitionTimingFunction: tokens.transitionTimingFunction,

      // Animations
      animation: tokens.animation,
      keyframes: tokens.keyframes,

      // Spacing (extends default)
      spacing: {
        topbar: tokens.spacing.topbar,
        sidebar: tokens.spacing.sidebar,
        "sidebar-collapsed": tokens.spacing["sidebar-collapsed"],
        widget: tokens.spacing.widget,
        "widget-sm": tokens.spacing["widget-sm"],
        "widget-lg": tokens.spacing["widget-lg"],
      },

      // Z-index
      zIndex: tokens.zIndex,

      // Font sizes
      fontSize: tokens.fontSize,
    },

    // Override border radius completely
    borderRadius: tokens.borderRadius,
  },
  plugins: [],
};
