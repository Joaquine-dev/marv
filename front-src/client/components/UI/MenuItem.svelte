<script>
  /**
   * MenuItem - Modern Glass Design System
   * Individual menu item with icon support
   */
  import Icon from "@/components/UI/Icon.svelte";

  export let icon = null;
  export let danger = false;
  export let disabled = false;

  let cls = "";
  export { cls as class };
</script>

<button
  type="button"
  on:click
  class="menu-item"
  class:danger
  class:disabled
  {disabled}
>
  {#if icon}
    <span class="menu-icon">
      <Icon icon={icon} size="16px" />
    </span>
  {/if}
  <span class="menu-label {cls}">
    <slot />
  </span>
</button>

<style>
  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
    padding: 0.5rem 0.625rem;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--color-text-secondary, #a1a1aa);
    font-size: 13px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: all 100ms ease;
  }

  .menu-item:hover {
    background: rgba(139, 92, 246, 0.1);
    color: var(--color-accent, #8b5cf6);
  }

  .menu-item:focus-visible {
    outline: none;
    background: rgba(139, 92, 246, 0.1);
    color: var(--color-accent, #8b5cf6);
  }

  .menu-item.danger:hover {
    background: rgba(244, 63, 94, 0.1);
    color: var(--color-error, #f43f5e);
  }

  .menu-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.disabled:hover {
    background: transparent;
    color: var(--color-text-secondary, #a1a1aa);
  }

  .menu-icon {
    display: flex;
    flex-shrink: 0;
    opacity: 0.8;
  }

  .menu-label {
    flex: 1;
    white-space: nowrap;
  }
</style>
