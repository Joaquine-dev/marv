<script context="module">
  /**
   * Panel Selector Button - Modern Glass Design System
   * Draggable tab button for panel navigation
   */
  let dragIndex = 0;
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import { currentPanel, setCurrentPanel } from "@/stores/panels";

  export let panel;
  export let index;

  let cls = "";
  export { cls as class };

  let isDragOver = false;
  let isDragging = false;

  const dispatch = createEventDispatcher();

  $: isActive = $currentPanel && $currentPanel.id === panel.id;

  function onDragStart({ dataTransfer }) {
    dataTransfer.setData("from", index);
    dragIndex = index;
    isDragging = true;
  }

  function onDragEnd() {
    isDragging = false;
  }

  function onDragOver(e) {
    e.preventDefault();
    isDragOver = index !== dragIndex;
  }

  function onDragLeave() {
    isDragOver = false;
  }

  function onDrop({ dataTransfer }) {
    dispatch("move", {
      from: parseInt(dataTransfer.getData("from")),
      to: index,
    });
    isDragOver = false;
  }
</script>

<div
  class="panel-tab-wrapper"
  class:dragging={isDragging}
  draggable={true}
  on:drop={onDrop}
  on:dragstart={onDragStart}
  on:dragend={onDragEnd}
  on:dragover={onDragOver}
  on:dragleave={onDragLeave}
>
  {#if isDragOver && index < dragIndex}
    <div class="drop-indicator left"></div>
  {/if}

  <button
    class="panel-tab {cls}"
    class:active={isActive}
    on:click={() => setCurrentPanel(panel)}
  >
    <span class="tab-label">{panel.name}</span>
  </button>

  {#if isDragOver && index > dragIndex}
    <div class="drop-indicator right"></div>
  {/if}
</div>

<style>
  .panel-tab-wrapper {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .panel-tab-wrapper.dragging {
    opacity: 0.5;
  }

  .panel-tab {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.875rem;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary, #a1a1aa);
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 6px;
    cursor: pointer;
    transition: all 150ms ease;
    white-space: nowrap;
    max-width: 150px;
  }

  .panel-tab:hover {
    color: var(--color-text-primary, #fafafa);
    background: var(--color-elevated, #1c1c1f);
    border-color: var(--color-border-hover, #3f3f46);
  }

  .panel-tab.active {
    color: var(--color-accent, #8b5cf6);
    background: rgba(139, 92, 246, 0.1);
    border-color: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.15);
  }

  .panel-tab:focus-visible {
    outline: 2px solid var(--color-accent, #8b5cf6);
    outline-offset: 2px;
  }

  .tab-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .drop-indicator {
    width: 3px;
    height: 24px;
    background: var(--color-accent, #8b5cf6);
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  }

  .drop-indicator.left {
    margin-right: 0.5rem;
  }

  .drop-indicator.right {
    margin-left: 0.5rem;
  }
</style>
