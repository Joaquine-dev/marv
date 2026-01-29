<script>
  /**
   * Ripple - Click feedback effect
   * Part of MARV Modern Glass Design System
   *
   * Usage: Add inside a button/clickable element
   * <button class="relative overflow-hidden">
   *   <Ripple />
   *   Click me
   * </button>
   */

  import { onMount } from "svelte";

  export let color = "rgba(139, 92, 246, 0.3)"; // accent color with opacity
  export let duration = 400;
  export let disabled = false;

  let container;
  let ripples = [];
  let nextId = 0;

  function handleClick(event) {
    if (disabled) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const id = nextId++;
    ripples = [...ripples, { id, x, y, size }];

    // Remove ripple after animation
    setTimeout(() => {
      ripples = ripples.filter((r) => r.id !== id);
    }, duration);
  }

  onMount(() => {
    const parent = container.parentElement;
    if (parent) {
      parent.addEventListener("click", handleClick);
      return () => parent.removeEventListener("click", handleClick);
    }
  });
</script>

<div bind:this={container} class="ripple-container">
  {#each ripples as ripple (ripple.id)}
    <span
      class="ripple"
      style="
        left: {ripple.x}px;
        top: {ripple.y}px;
        width: {ripple.size}px;
        height: {ripple.size}px;
        background-color: {color};
        animation-duration: {duration}ms;
      "
    />
  {/each}
</div>

<style>
  .ripple-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    border-radius: inherit;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple-effect var(--duration, 400ms) ease-out forwards;
    pointer-events: none;
  }

  @keyframes ripple-effect {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }
</style>
