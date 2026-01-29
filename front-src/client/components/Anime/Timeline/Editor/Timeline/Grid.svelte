<script>
  /**
   * Timeline Grid - Modern Glass Design System
   * Grid layout for timeline tracks with resizable splitter
   */
  import pannable from "@/libs/svelte/pannable.js";

  export let splitter;

  $: gridTemplate = `grid-template-columns: ${splitter.x}px auto`;
  $: splitterStyle = `
      cursor:ew-resize;
      width:${splitter.width + 4}px;
      left:calc(${splitter.x}px - ${splitter.width}px);
    `;

  function onSplitterPan({ detail }) {
    splitter.x = Math.max(splitter.min, Math.min(splitter.max, detail.x));
  }
</script>

<div class="timeline-container">
  <div class="timeline-header" style={gridTemplate}>
    <slot name="header" />
  </div>
  <div class="timeline-body">
    <div class="timeline-tracks" style={gridTemplate}>
      <slot />
    </div>
  </div>
  <div
    use:pannable
    on:panmove={onSplitterPan}
    on:mousedown|stopPropagation
    style={splitterStyle}
    class="splitter-handle"
  >
    <div class="splitter-line"></div>
  </div>
</div>

<style>
  .timeline-container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--color-surface, #141416);
  }

  .timeline-header {
    display: grid;
    white-space: nowrap;
    background: var(--color-elevated, #1c1c1f);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .timeline-header > :global(*) {
    border-right: 1px solid var(--color-border, #2a2a2d);
  }

  .timeline-body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .timeline-body::-webkit-scrollbar {
    width: 8px;
  }

  .timeline-body::-webkit-scrollbar-track {
    background: var(--color-background, #0a0a0b);
  }

  .timeline-body::-webkit-scrollbar-thumb {
    background: var(--color-border-hover, #3f3f46);
    border-radius: 4px;
  }

  .timeline-body::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted, #71717a);
  }

  .timeline-tracks {
    display: grid;
    white-space: nowrap;
  }

  .timeline-tracks > :global(*) {
    border-right: 1px solid rgba(139, 92, 246, 0.15);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  /* Alternating row colors */
  .timeline-tracks :global(.bg-0) {
    background: var(--color-surface, #141416);
  }

  .timeline-tracks :global(.bg-1) {
    background: var(--color-background, #0a0a0b);
  }

  /* Splitter handle */
  .splitter-handle {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .splitter-handle:hover .splitter-line {
    background: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  }

  .splitter-line {
    width: 2px;
    height: 100%;
    background: var(--color-border, #2a2a2d);
    border-radius: 1px;
    transition: all 150ms ease;
  }
</style>
