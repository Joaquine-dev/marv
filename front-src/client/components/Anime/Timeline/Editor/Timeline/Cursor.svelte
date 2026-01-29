<script>
  /**
   * Timeline Cursor - Modern Glass Design System
   * Playhead cursor with glow effect
   */
  import pannable from "@/libs/svelte/pannable.js";
  import { onMount, onDestroy, getContext } from "svelte";

  const { seek, anime, timeline, pixelPerMs } = getContext("Editor");
  let { left, scale } = timeline;

  export let min = 0;
  export let size = 2;
  export let margin = 10;

  let time = 0;
  let position = 0;
  let cursorElement;
  let max = Infinity;

  $: offset = min + margin;
  $: x = offset + position;
  $: cursorElement && min && getMaxWidth();
  $: position = seekTime($seek);
  $: isVisible = position >= 0;

  onMount(() => {
    window.addEventListener("resize", getMaxWidth);
  });

  onDestroy(() => {
    window.removeEventListener("resize", getMaxWidth);
  });

  function setPosition(pos) {
    position = Math.max(0, Math.min(max, pos));
  }

  function getMaxWidth() {
    const { width } = cursorElement.parentElement.getBoundingClientRect();
    max = width - offset - size - margin;
    seekPosition(position);
  }

  function setTimeFromPosition(pos) {
    setPosition(pos);
    time = ((position - $left) * pixelPerMs) / $scale;
  }

  function seekPosition(pos) {
    setTimeFromPosition(pos);
    $anime && $anime.seek(time);
  }

  function seekTime(seconds) {
    time = seconds;
    const pos = (time * $scale) / pixelPerMs + $left;
    return pos;
  }

  function onCursorPan({ detail }) {
    seekPosition(position + detail.dx);
  }
</script>

<div
  bind:this={cursorElement}
  use:pannable
  on:panmove={onCursorPan}
  on:mousedown|stopPropagation
  class="playhead"
  class:hidden={!isVisible}
  style="left:{x}px;"
>
  <div class="playhead-head"></div>
  <div class="playhead-line"></div>
</div>

<style>
  .playhead {
    position: absolute;
    z-index: 50;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
    pointer-events: auto;
  }

  .playhead.hidden {
    display: none;
  }

  .playhead-head {
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: linear-gradient(135deg, #f43f5e, #e11d48);
    border-radius: 2px 2px 50% 50%;
    box-shadow:
      0 2px 8px rgba(244, 63, 94, 0.4),
      0 0 0 2px rgba(244, 63, 94, 0.2);
  }

  .playhead-line {
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: linear-gradient(
      180deg,
      #f43f5e,
      rgba(244, 63, 94, 0.5) 50%,
      rgba(244, 63, 94, 0.2)
    );
    box-shadow: 0 0 8px rgba(244, 63, 94, 0.5);
  }

  .playhead:hover .playhead-head {
    transform: translateX(-50%) scale(1.1);
    box-shadow:
      0 4px 12px rgba(244, 63, 94, 0.5),
      0 0 0 3px rgba(244, 63, 94, 0.3);
  }

  .playhead:active .playhead-head {
    transform: translateX(-50%) scale(0.95);
  }
</style>
