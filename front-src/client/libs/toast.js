/**
 * Toast Notification Store
 * MARV Modern Glass Design System
 *
 * Usage:
 * import { toast } from '../libs/toast';
 * toast.success('Widget activated!');
 * toast.error('Connection lost', { action: { label: 'Retry', onClick: reconnect } });
 */

import { writable } from "svelte/store";

// Generate unique ID
function generateId() {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Create the store
function createToastStore() {
  const { subscribe, update } = writable([]);

  // Default durations by type
  const defaultDurations = {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 3000,
  };

  // Add a toast
  function add(type, message, options = {}) {
    const id = generateId();
    const duration = options.duration ?? defaultDurations[type] ?? 3000;

    const toast = {
      id,
      type,
      message,
      action: options.action || null,
      duration,
      createdAt: Date.now(),
    };

    update((toasts) => {
      // Limit to 3 toasts max
      const newToasts = [...toasts, toast];
      if (newToasts.length > 3) {
        newToasts.shift();
      }
      return newToasts;
    });

    // Auto-dismiss (unless duration is 0)
    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  }

  // Dismiss a toast
  function dismiss(id) {
    update((toasts) => toasts.filter((t) => t.id !== id));
  }

  // Clear all toasts
  function clear() {
    update(() => []);
  }

  return {
    subscribe,
    success: (message, options) => add("success", message, options),
    error: (message, options) => add("error", message, options),
    warning: (message, options) => add("warning", message, options),
    info: (message, options) => add("info", message, options),
    dismiss,
    clear,
  };
}

export const toast = createToastStore();
