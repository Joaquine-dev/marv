<script>
  /**
   * GlassCard - Base container with glassmorphism effect
   * Part of MARV Modern Glass Design System
   */

  export let cls = "";
  export { cls as class };

  // Elevation level (1-3)
  export let elevation = 1;

  // Enable glassmorphism blur effect
  export let blur = false;

  // Enable glow effect (accent color)
  export let glow = false;

  // Enable hover animation
  export let hoverable = false;

  // Padding preset
  export let padding = "p-4";

  // Border radius
  export let rounded = "rounded-lg";

  // Custom glow color: 'accent' | 'success' | 'error' | 'warning'
  export let glowColor = "accent";

  // Click handler (makes it a button)
  export let clickable = false;

  $: elevationClass = {
    0: "",
    1: "shadow-elevation-1",
    2: "shadow-elevation-2",
    3: "shadow-elevation-3",
  }[elevation] || "";

  $: blurClass = blur ? "glass" : "bg-background-surface";

  $: glowClass = glow ? `glow-${glowColor}` : "";

  $: hoverClass = hoverable
    ? "hover:border-border-accent hover:shadow-elevation-2 hover:-translate-y-0.5 cursor-pointer"
    : "";

  $: baseClass = `
    border border-border
    transition-all duration-200 ease-smooth
    ${rounded}
    ${padding}
    ${elevationClass}
    ${blurClass}
    ${glowClass}
    ${hoverClass}
    ${cls}
  `.trim().replace(/\s+/g, ' ');
</script>

{#if clickable}
  <button
    class={baseClass}
    on:click
    on:mouseenter
    on:mouseleave
    {...$$restProps}
  >
    <slot />
  </button>
{:else}
  <div
    class={baseClass}
    on:click
    on:mouseenter
    on:mouseleave
    {...$$restProps}
  >
    <slot />
  </div>
{/if}

<style>
  /* Glass effect with backdrop blur */
  :global(.glass) {
    background: rgba(20, 20, 22, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Elevation shadows */
  :global(.shadow-elevation-1) {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  :global(.shadow-elevation-2) {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  }
  :global(.shadow-elevation-3) {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  }

  /* Glow effects */
  :global(.glow-accent) {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }
  :global(.glow-success) {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
  }
  :global(.glow-error) {
    box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
  }
  :global(.glow-warning) {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
  }

  /* Smooth easing */
  :global(.ease-smooth) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
