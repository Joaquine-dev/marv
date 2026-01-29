<script>
  /**
   * EditMessage - Modern Glass Design System
   * Empty state message for panels
   */
  import { currentPanel } from "@/stores/panels";
  import { _ } from "@/libs/i18next";

  $: hasWidgets = $currentPanel && $currentPanel.widgets.length;
</script>

{#if !hasWidgets}
  <div class="empty-state">
    <div class="empty-content">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 4v16m-8-8h16" stroke-linecap="round" />
        </svg>
      </div>
      <p class="empty-text">{_('sentences.right-click-to-show-menu')}</p>
      <p class="empty-hint">ou double-cliquez pour ajouter un widget</p>
    </div>
  </div>
{/if}

<style>
  .empty-state {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: center;
    color: var(--color-text-muted, #71717a);
  }

  .empty-icon {
    width: 64px;
    height: 64px;
    padding: 1rem;
    border-radius: 16px;
    background: var(--color-surface, #141416);
    border: 2px dashed var(--color-border, #2a2a2d);
    color: var(--color-text-muted, #71717a);
    opacity: 0.6;
  }

  .empty-icon svg {
    width: 100%;
    height: 100%;
  }

  .empty-text {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text-secondary, #a1a1aa);
  }

  .empty-hint {
    font-size: 0.875rem;
    opacity: 0.7;
  }
</style>
