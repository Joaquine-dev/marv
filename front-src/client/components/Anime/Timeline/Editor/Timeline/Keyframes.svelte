<script>
  /**
   * Keyframes Container - Modern Glass Design System
   * Container for keyframe track with zoom/pan support
   */
  import pannable from "@/libs/svelte/pannable.js";
  import { createEventDispatcher, getContext } from "svelte";

  const dispatch = createEventDispatcher();
  const { timeline } = getContext("Editor");
  const { left, scale } = timeline;

  export let selected = false;
  export let zoom = { min: 0.1, max: 10, sensitivity: 50 };

  let wrapperElement;

  function onPanMove({ detail }) {
    $left = Math.min(0, $left + detail.dx);
  }

  function onDoubleClick(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    dispatch("add", { offset: (event.clientX - x - $left) / $scale });
  }

  function onWheel(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    const delta = -event.deltaY / 100;
    const tx = (event.clientX - x - $left) / $scale;
    const newScale = $scale + delta / (zoom.sensitivity / $scale);
    $scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    $left = Math.min(0, -tx * $scale + event.clientX - x);
  }

  function onContextmenu(event) {
    event.preventDefault();
    event.stopPropagation();
  }
</script>

<div
  class="keyframes-track"
  class:selected
  on:contextmenu={onContextmenu}
>
  <div
    bind:this={wrapperElement}
    use:pannable
    on:panmove={onPanMove}
    on:dblclick={onDoubleClick}
    on:wheel|preventDefault={onWheel}
    class="keyframes-viewport"
  >
    <div
      class="keyframes-content"
      style="left:{$left}px"
    >
      <slot />
    </div>
  </div>
</div>

<style>
  .keyframes-track {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    background: var(--color-background, #0a0a0b);
    transition: background 150ms ease;
  }

  .keyframes-track.selected {
    background: rgba(139, 92, 246, 0.05);
  }

  .keyframes-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: grab;
  }

  .keyframes-viewport:active {
    cursor: grabbing;
  }

  .keyframes-content {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
</style>
