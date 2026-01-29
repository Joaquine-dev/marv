module.exports = {
  // Background colors
  background: "#0f0f0f",
  surface: "#1a1a1a",

  // Border colors
  border: "#2a2a2a",

  // Text colors
  text: {
    primary: "#ffffff",
    secondary: "#888888",
  },

  // Accent color (indigo)
  accent: {
    DEFAULT: "#6366f1",
    hover: "#818cf8",
    muted: "rgba(99, 102, 241, 0.1)",
  },

  // Semantic colors
  success: {
    DEFAULT: "#22c55e",
    muted: "rgba(34, 197, 94, 0.1)",
  },
  error: {
    DEFAULT: "#ef4444",
    muted: "rgba(239, 68, 68, 0.1)",
  },
  warning: {
    DEFAULT: "#f59e0b",
    muted: "rgba(245, 158, 11, 0.1)",
  },
  info: {
    DEFAULT: "#3b82f6",
    muted: "rgba(59, 130, 246, 0.1)",
  },

  // Legacy support (backwards compatibility)
  primary: {
    light: "#818cf8",
    lighter: "#6366f1",
    DEFAULT: "#6366f1",
    darker: "#4f46e5",
    dark: "#4338ca",
  },
  secondary: {
    light: "#60a5fa",
    lighter: "#3b82f6",
    DEFAULT: "#3b82f6",
    darker: "#2563eb",
    dark: "#1d4ed8",
  },
  light: {
    lighter: "#ffffff",
    DEFAULT: "#ffffff",
    darker: "#888888",
  },
  dark: {
    lighter: "#2a2a2a",
    DEFAULT: "#1a1a1a",
    darker: "#0f0f0f",
  },
};
