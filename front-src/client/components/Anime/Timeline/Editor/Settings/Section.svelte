<script>
  /**
   * Settings Section - Modern Glass Design System
   * Collapsible section with header
   */
  import Icon from "@/components/UI/Icon.svelte";
  import MdExpandMore from "svelte-icons/md/MdExpandMore.svelte";
  import MdExpandLess from "svelte-icons/md/MdExpandLess.svelte";

  export let visible = true;
  export let expended = true;

  function toggle() {
    expended = !expended;
  }
</script>

{#if visible}
  <div class="section">
    <button type="button" class="section-header" on:click={toggle}>
      <div class="section-title">
        <slot name="title" />
      </div>
      <span class="section-toggle" class:expanded={expended}>
        <Icon
          icon={expended ? MdExpandLess : MdExpandMore}
          size="18px"
        />
      </span>
    </button>
    <div class="section-content" class:collapsed={!expended}>
      <slot />
    </div>
  </div>
{/if}

<style>
  .section {
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .section-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--color-elevated, #1c1c1f);
    border: none;
    cursor: pointer;
    transition: background 150ms ease;
  }

  .section-header:hover {
    background: var(--color-surface, #141416);
  }

  .section-title {
    flex: 1;
    text-align: left;
    overflow: hidden;
  }

  .section-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--color-text-muted, #71717a);
    transition: all 150ms ease;
  }

  .section-toggle.expanded {
    color: var(--color-accent, #8b5cf6);
  }

  .section-content {
    overflow: hidden;
    transition: all 150ms ease;
  }

  .section-content.collapsed {
    display: none;
  }

  .section-content > :global(*) {
    border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  }

  .section-content > :global(*:last-child) {
    border-bottom: none;
  }
</style>
