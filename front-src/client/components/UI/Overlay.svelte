<script>
  /**
   * Overlay - Modern Glass Design System
   * Backdrop with blur effect for modals and drawers
   */
  import { electron } from "@/stores/app";
  import { fade } from "svelte/transition";
  import Portal from "svelte-portal";

  // Legacy props
  export let colors = "bg-background/90";

  // New props
  export let blur = true;
  export let zIndex = 50;

  let top = electron ? 29 : 0;
  let content = "flex overflow-auto items-center justify-center";
  let position = `absolute left-0 right-0 bottom-0 z-${zIndex}`;

  $: blurClass = blur ? "backdrop-blur-md" : "";
</script>

<Portal target="body">
  <div
    on:click
    on:mousedown
    on:keydown
    class="overlay {content} {colors} {blurClass} {position}"
    style="margin-top:{top}px;height: calc(100% - {top}px)"
    transition:fade={{ duration: 150 }}
    role="presentation"
  >
    <slot />
  </div>
</Portal>

<style>
  .overlay {
    animation: overlay-in 150ms ease-out;
  }

  @keyframes overlay-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* Backdrop blur */
  :global(.backdrop-blur-md) {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
</style>
