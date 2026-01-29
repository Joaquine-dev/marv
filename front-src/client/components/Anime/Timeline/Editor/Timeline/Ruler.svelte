<script>
  /**
   * Timeline Ruler - Modern Glass Design System
   * Time ruler with seconds markers
   */
  import { getContext } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";

  export let zoom = { min: 0.1, max: 10, sensitivity: 50 };

  const { anime, pixelPerMs, timeline } = getContext("Editor");
  const { left, scale } = timeline;

  let unit = 1000 / pixelPerMs;
  let wrapperElement;

  $: duration = $anime ? $anime.duration : 0;
  $: units = duration ? Array(Math.ceil(duration / 1000)) : [];

  function onPanMove({ detail }) {
    $left = Math.min(0, $left + detail.dx);
  }

  function onWheel(event) {
    const { x } = wrapperElement.getBoundingClientRect();
    const delta = event.deltaY / 100;
    const tx = (event.clientX - x - $left) / $scale;
    const newScale = $scale + delta / (zoom.sensitivity / $scale);
    $scale = Math.max(zoom.min, Math.min(newScale, zoom.max));
    $left = Math.min(0, -tx * $scale + event.clientX - x);
  }
</script>

<div
  use:pannable
  class="ruler-container"
  on:panmove={onPanMove}
  bind:this={wrapperElement}
  on:wheel|preventDefault={onWheel}
>
  <div class="ruler-viewport">
    <div class="ruler-track" style="left:{$left}px;">
      {#each units as _, i}
        <div
          class="ruler-segment"
          style="width:{unit * $scale}px;"
        >
          {#each Array(10) as _, y}
            <div
              class="ruler-tick"
              class:major={y === 0}
              class:half={y === 5}
            ></div>
          {/each}
          <span class="ruler-label">{i + 1}s</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .ruler-container {
    height: 100%;
    padding-left: 10px;
    background: var(--color-elevated, #1c1c1f);
    cursor: grab;
  }

  .ruler-container:active {
    cursor: grabbing;
  }

  .ruler-viewport {
    position: relative;
    display: flex;
    height: 100%;
    overflow: hidden;
  }

  .ruler-track {
    position: absolute;
    display: flex;
    height: 100%;
  }

  .ruler-segment {
    position: relative;
    display: flex;
    height: 100%;
    border-right: 1px solid rgba(139, 92, 246, 0.3);
  }

  .ruler-tick {
    flex: 1;
    height: 6px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ruler-tick.major {
    height: 12px;
    border-right-color: rgba(139, 92, 246, 0.5);
  }

  .ruler-tick.half {
    height: 9px;
    border-right-color: rgba(255, 255, 255, 0.15);
  }

  .ruler-tick:last-child {
    border-right: none;
  }

  .ruler-label {
    position: absolute;
    bottom: 2px;
    right: 6px;
    font-size: 10px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-muted, #71717a);
  }
</style>
