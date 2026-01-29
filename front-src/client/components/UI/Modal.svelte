<script>
  /**
   * Modal - Modern Glass Design System
   * Glassmorphism modal with smooth animations
   */
  import Icon from "./Icon.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  const dispatch = createEventDispatcher();

  // Legacy props
  export let title = null;
  export let opened = false;
  export let minWidth = 300;
  export let closeCross = true;
  export let closeOnBlur = true;

  let cls = "";
  export { cls as class };

  // New props
  export let size = "md"; // sm, md, lg, xl
  export let glass = true;

  // Size presets
  const sizes = {
    sm: 400,
    md: 500,
    lg: 700,
    xl: 900,
  };

  $: modalWidth = sizes[size] || minWidth;

  function close() {
    opened = false;
    dispatch("close");
  }

  function onClickOut() {
    closeOnBlur && close();
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      close();
    }
  }

  // Focus trap
  let modalElement;

  onMount(() => {
    if (opened && modalElement) {
      const focusable = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) {
        focusable[0].focus();
      }
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if opened}
  <Overlay on:mousedown on:click={onClickOut}>
    <div
      bind:this={modalElement}
      class="modal-container m-auto {cls}"
      on:click|stopPropagation
      on:keydown|stopPropagation
      style="width: min({modalWidth}px, calc(100vw - 2rem))"
      transition:scale={{ duration: 200, start: 0.95, easing: backOut }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        class="modal-content rounded-xl border border-border shadow-elevation-3"
        class:glass
        class:bg-background-surface={!glass}
      >
        {#if title}
          <div class="modal-header p-4 flex items-center gap-3 border-b border-border">
            <h2 id="modal-title" class="flex-auto font-semibold text-lg text-text-primary">
              {title}
            </h2>
            {#if closeCross}
              <button
                on:click={close}
                class="modal-close p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-background-hover transition-all duration-150"
                aria-label="Fermer"
              >
                <Icon icon={MdClose} size="20px" />
              </button>
            {/if}
          </div>
        {/if}
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </Overlay>
{/if}

<style>
  .modal-container {
    max-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
  }

  .modal-content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: inherit;
  }

  .modal-content.glass {
    background: rgba(20, 20, 22, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .modal-header {
    flex-shrink: 0;
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Elevation shadow */
  :global(.shadow-elevation-3) {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
  }

  /* Close button focus */
  .modal-close:focus-visible {
    outline: 2px solid var(--color-accent, #8b5cf6);
    outline-offset: 2px;
  }
</style>
