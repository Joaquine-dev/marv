<script>
  /**
   * Notify - Modern Glass Design System
   * Inline notification with auto-dismiss
   */
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  export let message;
  export let delay = 5000;
  export let type = "info";
  export let closable = true;

  const dispatch = createEventDispatcher();

  function close() {
    message = null;
    dispatch("close");
  }

  let timeoutId = null;

  $: if (message) {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(close, delay);
  }
</script>

{#if message}
  <div
    in:fade={{ duration: 150 }}
    out:fade={{ duration: 150 }}
    class="notify notify-{type}"
  >
    <div class="notify-content">{message}</div>
    {#if closable}
      <button type="button" class="notify-close" on:click={close}>
        <Icon icon={MdClose} size="16px" />
      </button>
    {/if}
  </div>
{/if}

<style>
  .notify {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    background: var(--color-surface, #141416);
    border-radius: 8px;
    border-left: 3px solid var(--color-info, #06b6d4);
    color: var(--color-text-primary, #fafafa);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .notify-info {
    border-left-color: var(--color-info, #06b6d4);
  }

  .notify-warn {
    border-left-color: var(--color-warning, #f59e0b);
  }

  .notify-error {
    border-left-color: var(--color-error, #f43f5e);
  }

  .notify-success {
    border-left-color: var(--color-success, #10b981);
  }

  .notify-content {
    flex: 1;
    padding: 0.75rem 0.75rem 0.75rem 1rem;
    font-size: 14px;
    line-height: 1.5;
  }

  .notify-close {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    background: transparent;
    border: none;
    color: var(--color-text-muted, #71717a);
    cursor: pointer;
    transition: color 150ms ease;
  }

  .notify-close:hover {
    color: var(--color-text-primary, #fafafa);
  }
</style>
