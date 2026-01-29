<script>
  /**
   * Widget Button - Modern Glass Design System
   * Individual widget card with glassmorphism effect
   */
  import { _ } from "@/libs/i18next";
  import widgets from "@/components/Widgets";
  import { editMode, selectedWidget } from "@/stores/panels";

  export let widget;

  $: component = widget.component;
  $: bgColor = `background-color: ${widget.backgroundColor};`;
  $: bgImage = widget.backgroundImage
    ? `background-image: url(files/${widget.backgroundImage});`
    : "";
  $: selected = $selectedWidget && $selectedWidget.id === widget.id;

  function select() {
    $selectedWidget = widget;
  }
</script>

<div
  on:mouseup={select}
  style={bgColor + bgImage}
  class="widget-card"
  class:selected
  class:edit-mode={$editMode}
>
  {#if component}
    <div class="widget-content">
      <svelte:component
        this={widgets[component.name].Widget}
        widget={widget}
      />
    </div>
  {/if}

  {#if $editMode}
    {#if !component}
      <div class="empty-widget">
        <span class="empty-text">{_('sentences.right-click-to-show-menu')}</span>
      </div>
    {/if}
    <div class="drag-overlay"></div>
  {/if}
</div>

<style>
  .widget-card {
    position: relative;
    height: 100%;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 8px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    transition: all 150ms ease;
  }

  .widget-card:hover {
    border-color: var(--color-border-hover, #3f3f46);
  }

  .widget-card.selected {
    border-color: var(--color-accent, #8b5cf6);
    box-shadow:
      0 0 0 1px var(--color-accent, #8b5cf6),
      0 0 20px rgba(139, 92, 246, 0.2);
  }

  .widget-card.edit-mode {
    cursor: move;
  }

  .widget-card.edit-mode:hover {
    border-color: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.15);
  }

  .widget-content {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .empty-widget {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-text {
    padding: 0.5rem;
    font-size: 11px;
    color: var(--color-text-muted, #71717a);
    text-align: center;
  }

  .drag-overlay {
    position: absolute;
    inset: 0;
    cursor: move;
    border-radius: 8px;
  }

  /* Glow effect on hover in edit mode */
  .widget-card.edit-mode:active {
    transform: scale(0.98);
    box-shadow:
      0 0 0 2px var(--color-accent, #8b5cf6),
      0 0 24px rgba(139, 92, 246, 0.3);
  }
</style>
