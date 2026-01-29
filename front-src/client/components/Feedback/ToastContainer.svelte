<script>
  /**
   * ToastContainer - Container for toast notifications
   * Part of MARV Modern Glass Design System
   *
   * Usage: Add once in App.svelte
   * <ToastContainer />
   */

  import { toast } from "../../libs/toast";
  import Toast from "./Toast.svelte";

  // Position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  export let position = "bottom-right";

  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  $: positionClass = positionClasses[position] || positionClasses["bottom-right"];

  function handleDismiss(event) {
    toast.dismiss(event.detail.id);
  }
</script>

<div class="toast-container {positionClass}">
  {#each $toast as t (t.id)}
    <Toast
      id={t.id}
      type={t.type}
      message={t.message}
      action={t.action}
      on:dismiss={handleDismiss}
    />
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    z-index: 600;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    pointer-events: none;
  }

  .toast-container > :global(*) {
    pointer-events: auto;
  }
</style>
