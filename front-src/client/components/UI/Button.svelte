<script>
  /**
   * Button - Modern Glass Design System
   * Modernized with ripple effect, loading state, and new variants
   */
  import Icon from "./Icon.svelte";
  import Ripple from "../Base/Ripple.svelte";

  export let cls = "";
  export { cls as class };

  // Legacy props (backwards compatibility)
  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let iconColor = null;
  export let textColor = null;
  export let padding = "p-2";
  export let disabled = false;

  // Variant: default, accent, primary, secondary, ghost, success, error
  export let variant = "default";

  // New props
  export let size = "md"; // sm, md, lg
  export let loading = false;
  export let rounded = "rounded-lg";

  // Size presets
  const sizes = {
    sm: "px-2 py-1 text-sm gap-1",
    md: "px-3 py-2 text-base gap-2",
    lg: "px-4 py-3 text-lg gap-2",
  };

  // Variant styles (Modern Glass)
  const variants = {
    // Legacy variants (backwards compatible)
    default: `
      bg-transparent border-border
      hover:border-border-accent hover:bg-accent-muted
      active:scale-[0.98]
    `,
    accent: `
      bg-accent-muted border-accent
      hover:bg-accent hover:text-white
      active:scale-[0.98]
    `,
    success: `
      bg-success-muted border-success
      hover:bg-success hover:text-white
      active:scale-[0.98]
    `,
    error: `
      bg-error-muted border-error
      hover:bg-error hover:text-white
      active:scale-[0.98]
    `,

    // New Modern Glass variants
    primary: `
      bg-gradient-to-br from-accent to-accent-secondary
      border-transparent text-white
      hover:shadow-glow-accent hover:-translate-y-0.5
      active:translate-y-0 active:scale-[0.98]
    `,
    secondary: `
      bg-transparent border-accent text-accent
      hover:bg-accent-muted
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent border-transparent text-text-secondary
      hover:text-text-primary hover:bg-background-hover
      active:scale-[0.98]
    `,
  };

  $: variantClass = variants[variant] || variants.default;
  $: sizeClass = padding !== "p-2" ? padding : (sizes[size] || sizes.md);
  $: colorClass = textColor || "text-text-primary";
  $: disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer";
  $: loadingClass = loading ? "relative" : "";
</script>

<button
  disabled={disabled || loading}
  class="
    relative overflow-hidden
    inline-flex items-center justify-center
    font-medium border {rounded}
    transition-all duration-200 ease-smooth
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
    {variantClass} {sizeClass} {colorClass} {disabledClass} {loadingClass} {cls}
  "
  {...$$restProps}
  on:click
>
  <!-- Loading spinner -->
  {#if loading}
    <div class="absolute inset-0 flex items-center justify-center bg-inherit">
      <div class="spinner" />
    </div>
  {/if}

  <!-- Content -->
  <span class="inline-flex items-center gap-2" class:opacity-0={loading}>
    {#if icon}
      <Icon {icon} size={iconSize} color={iconColor} />
    {/if}
    <slot />
  </span>

  <!-- Ripple effect -->
  <Ripple disabled={disabled || loading} />
</button>

<style>
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Gradient background for primary */
  :global(.bg-gradient-to-br) {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
  }

  /* Glow shadow */
  :global(.shadow-glow-accent) {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }

  /* Smooth easing */
  :global(.ease-smooth) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
