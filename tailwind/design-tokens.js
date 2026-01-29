/**
 * MARV Design Tokens - Modern Glass Theme
 * Version: 2.0
 *
 * Ce fichier centralise tous les tokens de design pour le redesign MARV.
 * Direction visuelle: "Modern Glass" - Glassmorphism élégant avec profondeur.
 */

module.exports = {
  // ============================================
  // COLORS
  // ============================================
  colors: {
    // Backgrounds (Dark Theme)
    background: {
      DEFAULT: "#0a0a0b",
      surface: "#141416",
      elevated: "#1c1c1f",
      hover: "#222225",
    },

    // Borders
    border: {
      DEFAULT: "#2a2a2d",
      subtle: "#1f1f22",
      accent: "rgba(139, 92, 246, 0.5)",
    },

    // Accent (Violet Gradient)
    accent: {
      DEFAULT: "#8b5cf6",
      secondary: "#6366f1",
      hover: "#a78bfa",
      muted: "rgba(139, 92, 246, 0.1)",
      glow: "rgba(139, 92, 246, 0.4)",
    },

    // Semantic Colors
    success: {
      DEFAULT: "#10b981",
      muted: "rgba(16, 185, 129, 0.1)",
      glow: "rgba(16, 185, 129, 0.4)",
    },
    error: {
      DEFAULT: "#f43f5e",
      muted: "rgba(244, 63, 94, 0.1)",
      glow: "rgba(244, 63, 94, 0.4)",
    },
    warning: {
      DEFAULT: "#f59e0b",
      muted: "rgba(245, 158, 11, 0.1)",
      glow: "rgba(245, 158, 11, 0.4)",
    },
    info: {
      DEFAULT: "#3b82f6",
      muted: "rgba(59, 130, 246, 0.1)",
      glow: "rgba(59, 130, 246, 0.4)",
    },

    // Text Colors
    text: {
      primary: "#fafafa",
      secondary: "#a1a1aa",
      muted: "#71717a",
      inverse: "#0a0a0b",
    },

    // Glass Effect Colors
    glass: {
      bg: "rgba(20, 20, 22, 0.8)",
      border: "rgba(255, 255, 255, 0.1)",
    },

    // Legacy support (backwards compatibility)
    primary: {
      light: "#a78bfa",
      lighter: "#8b5cf6",
      DEFAULT: "#8b5cf6",
      darker: "#7c3aed",
      dark: "#6d28d9",
    },
    secondary: {
      light: "#818cf8",
      lighter: "#6366f1",
      DEFAULT: "#6366f1",
      darker: "#4f46e5",
      dark: "#4338ca",
    },
    light: {
      lighter: "#ffffff",
      DEFAULT: "#fafafa",
      darker: "#a1a1aa",
    },
    dark: {
      lighter: "#2a2a2d",
      DEFAULT: "#141416",
      darker: "#0a0a0b",
    },
  },

  // ============================================
  // BOX SHADOWS (Elevation System)
  // ============================================
  boxShadow: {
    none: "none",
    "elevation-1": "0 1px 2px rgba(0, 0, 0, 0.3)",
    "elevation-2": "0 4px 6px rgba(0, 0, 0, 0.4)",
    "elevation-3": "0 10px 15px rgba(0, 0, 0, 0.5)",
    "elevation-4": "0 20px 25px rgba(0, 0, 0, 0.6)",
    "glow-accent": "0 0 20px rgba(139, 92, 246, 0.4)",
    "glow-success": "0 0 20px rgba(16, 185, 129, 0.4)",
    "glow-error": "0 0 20px rgba(244, 63, 94, 0.4)",
    "glow-warning": "0 0 20px rgba(245, 158, 11, 0.4)",
    "glow-info": "0 0 20px rgba(59, 130, 246, 0.4)",
    inner: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  borderRadius: {
    none: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    half: "50%",
    full: "9999px",
  },

  // ============================================
  // SPACING (Base 4px)
  // ============================================
  spacing: {
    px: "1px",
    0: "0",
    0.5: "2px",
    1: "4px",
    1.5: "6px",
    2: "8px",
    2.5: "10px",
    3: "12px",
    3.5: "14px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    11: "44px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    // Layout specific
    topbar: "56px",
    sidebar: "240px",
    "sidebar-collapsed": "64px",
    widget: "100px",
    "widget-sm": "80px",
    "widget-lg": "120px",
  },

  // ============================================
  // TRANSITIONS
  // ============================================
  transitionDuration: {
    fast: "100ms",
    DEFAULT: "200ms",
    normal: "200ms",
    slow: "300ms",
    slower: "400ms",
  },

  transitionTimingFunction: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  animation: {
    "fade-in": "fadeIn 200ms ease-out",
    "fade-out": "fadeOut 200ms ease-out",
    "slide-up": "slideUp 200ms ease-out",
    "slide-down": "slideDown 200ms ease-out",
    "scale-in": "scaleIn 150ms ease-out",
    "scale-out": "scaleOut 150ms ease-out",
    ripple: "ripple 400ms ease-out",
    "glow-pulse": "glowPulse 2s ease-in-out infinite",
    shake: "shake 300ms ease-in-out",
    spin: "spin 1s linear infinite",
  },

  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    fadeOut: {
      "0%": { opacity: "1" },
      "100%": { opacity: "0" },
    },
    slideUp: {
      "0%": { opacity: "0", transform: "translateY(8px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    slideDown: {
      "0%": { opacity: "0", transform: "translateY(-8px)" },
      "100%": { opacity: "1", transform: "translateY(0)" },
    },
    scaleIn: {
      "0%": { opacity: "0", transform: "scale(0.95)" },
      "100%": { opacity: "1", transform: "scale(1)" },
    },
    scaleOut: {
      "0%": { opacity: "1", transform: "scale(1)" },
      "100%": { opacity: "0", transform: "scale(0.95)" },
    },
    ripple: {
      "0%": { transform: "scale(0)", opacity: "0.5" },
      "100%": { transform: "scale(4)", opacity: "0" },
    },
    glowPulse: {
      "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)" },
      "50%": { boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" },
    },
    shake: {
      "0%, 100%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-4px)" },
      "75%": { transform: "translateX(4px)" },
    },
    spin: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  },

  // ============================================
  // BACKDROP BLUR
  // ============================================
  backdropBlur: {
    none: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    glass: "12px",
    "glass-heavy": "20px",
  },

  // ============================================
  // Z-INDEX
  // ============================================
  zIndex: {
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    dropdown: "100",
    sticky: "200",
    modal: "300",
    popover: "400",
    tooltip: "500",
    toast: "600",
  },

  // ============================================
  // FONT SIZES
  // ============================================
  fontSize: {
    xs: ["11px", { lineHeight: "16px" }],
    sm: ["13px", { lineHeight: "20px" }],
    base: ["14px", { lineHeight: "22px" }],
    lg: ["16px", { lineHeight: "24px" }],
    xl: ["18px", { lineHeight: "28px" }],
    "2xl": ["24px", { lineHeight: "32px" }],
    "3xl": ["30px", { lineHeight: "36px" }],
  },

  // ============================================
  // FONT WEIGHTS
  // ============================================
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};
