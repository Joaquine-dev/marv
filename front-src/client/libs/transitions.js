/**
 * MARV Custom Svelte Transitions
 * Modern Glass Theme - Smooth animations
 */

import { cubicOut, backOut, quintOut } from "svelte/easing";

/**
 * Glass fade in with scale - for modals and cards
 */
export function glassIn(node, { duration = 200, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: scale(${0.95 + 0.05 * eased});
      `;
    },
  };
}

/**
 * Glass fade out with scale
 */
export function glassOut(node, { duration = 150, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: scale(${0.95 + 0.05 * eased});
      `;
    },
  };
}

/**
 * Slide up animation - for toasts and notifications
 */
export function slideUp(node, { duration = 200, delay = 0, y = 8 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: translateY(${y * (1 - eased)}px);
      `;
    },
  };
}

/**
 * Slide down animation
 */
export function slideDown(node, { duration = 200, delay = 0, y = -8 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        transform: translateY(${y * (1 - eased)}px);
      `;
    },
  };
}

/**
 * Bounce scale - for success feedback
 */
export function bounceIn(node, { duration = 300, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = backOut(t);
      return `
        opacity: ${Math.min(1, t * 2)};
        transform: scale(${eased});
      `;
    },
  };
}

/**
 * Fade in simple
 */
export function fadeIn(node, { duration = 200, delay = 0 }) {
  return {
    duration,
    delay,
    css: (t) => `opacity: ${cubicOut(t)}`,
  };
}

/**
 * Expand from center - for dropdowns
 */
export function expandY(node, { duration = 200, delay = 0 }) {
  const height = node.offsetHeight;
  return {
    duration,
    delay,
    css: (t) => {
      const eased = cubicOut(t);
      return `
        opacity: ${eased};
        height: ${height * eased}px;
        overflow: hidden;
      `;
    },
  };
}

/**
 * Sidebar collapse/expand
 */
export function collapseX(node, { duration = 200, delay = 0, width = 240 }) {
  return {
    duration,
    delay,
    css: (t) => {
      const eased = quintOut(t);
      return `
        width: ${width * eased}px;
        overflow: hidden;
      `;
    },
  };
}
