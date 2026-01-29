<script>
  /**
   * WidgetCard - Widget wrapper with rich visual feedback
   * Part of MARV Modern Glass Design System
   *
   * States: idle -> loading -> success | error -> idle
   */

  import { createEventDispatcher } from "svelte";
  import GlassCard from "../Base/GlassCard.svelte";
  import Ripple from "../Base/Ripple.svelte";

  export let cls = "";
  export { cls as class };

  // Widget data (optional, for context)
  export let widget = null;

  // Disable interactions
  export let disabled = false;

  // Size preset
  export let size = "md"; // sm, md, lg

  // Current state
  let state = "idle"; // idle | loading | success | error

  const dispatch = createEventDispatcher();

  // Size classes
  const sizes = {
    sm: "w-20 h-20",
    md: "w-24 h-24",
    lg: "w-28 h-28",
  };

  // State-based styling
  $: stateClasses = {
    idle: "",
    loading: "opacity-80",
    success: "glow-success border-success",
    error: "glow-error border-error animate-shake",
  }[state] || "";

  $: sizeClass = sizes[size] || sizes.md;

  // Handle click
  function handleClick(event) {
    if (disabled || state === "loading") return;

    state = "loading";
    dispatch("click", { widget, event });
  }

  // Public methods to set state from parent
  export function setLoading() {
    state = "loading";
  }

  export function setSuccess() {
    state = "success";
    setTimeout(() => {
      state = "idle";
    }, 1000);
  }

  export function setError() {
    state = "error";
    setTimeout(() => {
      state = "idle";
    }, 2000);
  }

  export function setIdle() {
    state = "idle";
  }

  // Expose state for reactive bindings
  export function getState() {
    return state;
  }
</script>

<GlassCard
  class="widget-card {sizeClass} {stateClasses} {cls}"
  elevation={state === "idle" ? 1 : 2}
  hoverable={!disabled && state === "idle"}
  glow={state === "success" || state === "error"}
  glowColor={state === "success" ? "success" : state === "error" ? "error" : "accent"}
  clickable
  padding="p-0"
  on:click={handleClick}
  {...$$restProps}
>
  <div class="widget-card-inner">
    <!-- Loading overlay -->
    {#if state === "loading"}
      <div class="widget-loading">
        <div class="spinner" />
      </div>
    {/if}

    <!-- Success indicator -->
    {#if state === "success"}
      <div class="widget-success">
        <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    {/if}

    <!-- Content -->
    <div class="widget-content" class:opacity-50={state === "loading"}>
      <slot />
    </div>

    <!-- Ripple effect -->
    <Ripple disabled={disabled || state === "loading"} />
  </div>
</GlassCard>

<style>
  :global(.widget-card) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    user-select: none;
  }

  .widget-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .widget-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    transition: opacity 150ms ease;
    z-index: 1;
  }

  /* Loading state */
  .widget-loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 10, 11, 0.5);
    z-index: 10;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Success state */
  .widget-success {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    animation: success-pop 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .check-icon {
    width: 32px;
    height: 32px;
    color: #10b981;
    filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
  }

  /* Animations */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes success-pop {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  :global(.animate-shake) {
    animation: shake 300ms ease-in-out;
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }
</style>
