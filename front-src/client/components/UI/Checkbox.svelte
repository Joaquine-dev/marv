<script>
  /**
   * Checkbox - Modern Glass Design System
   * Modernized with smooth animations and satisfying check effect
   */
  import { createEventDispatcher } from "svelte";

  // Legacy props (backwards compatibility)
  export let label = null;
  export let checked = false;
  export let labelClass = "cursor-pointer";

  // New props
  export let disabled = false;
  export let size = "md"; // sm, md, lg

  const sizes = {
    sm: { box: "w-4 h-4", icon: "w-2.5 h-2.5" },
    md: { box: "w-5 h-5", icon: "w-3 h-3" },
    lg: { box: "w-6 h-6", icon: "w-4 h-4" },
  };

  $: sizeClass = sizes[size] || sizes.md;
  $: disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const dispatch = createEventDispatcher();

  function toggle() {
    if (disabled) return;
    checked = !checked;
    dispatch("change", checked);
  }

  function handleKeydown(event) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      toggle();
    }
  }
</script>

<div
  class="checkbox-wrapper flex items-center gap-3 p-2 {disabledClass} group"
  on:click={toggle}
  on:keydown={handleKeydown}
  role="checkbox"
  aria-checked={checked}
  tabindex={disabled ? -1 : 0}
>
  <div
    class="
      checkbox-box {sizeClass.box}
      rounded border-2 transition-all duration-200 ease-smooth
      flex items-center justify-center
      {checked
        ? 'bg-accent border-accent shadow-glow-accent'
        : 'border-border bg-transparent group-hover:border-accent/50'}
    "
  >
    {#if checked}
      <svg
        class="check-icon {sizeClass.icon} text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M5 13l4 4L19 7"
          class="check-path"
        />
      </svg>
    {/if}
  </div>
  {#if label}
    <span class="text-text-primary select-none {labelClass}">{label}</span>
  {/if}
</div>

<style>
  .checkbox-wrapper:focus-visible {
    outline: none;
  }

  .checkbox-wrapper:focus-visible .checkbox-box {
    outline: 2px solid var(--color-accent, #8b5cf6);
    outline-offset: 2px;
  }

  /* Check animation */
  .check-icon {
    animation: check-pop 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .check-path {
    stroke-dasharray: 24;
    stroke-dashoffset: 0;
    animation: check-draw 200ms ease-out;
  }

  @keyframes check-pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes check-draw {
    0% {
      stroke-dashoffset: 24;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  /* Glow effect */
  :global(.shadow-glow-accent) {
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.4);
  }

  /* Smooth easing */
  :global(.ease-smooth) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
