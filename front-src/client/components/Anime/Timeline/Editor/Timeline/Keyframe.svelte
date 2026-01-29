<script>
  /**
   * Keyframe - Modern Glass Design System
   * Individual keyframe diamond with duration bar
   */
  import { getContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import pannable from "@/libs/svelte/pannable.js";

  const dispatch = createEventDispatcher();
  const { selectedKeyframe, pixelPerMs, timeline } = getContext("Editor");
  const { scale } = timeline;

  export let keyframe;

  let halfWidth = 10;

  $: width = (keyframe.duration / pixelPerMs) * $scale;
  $: left = (keyframe.delay / pixelPerMs) * $scale - halfWidth;
  $: selectedId = $selectedKeyframe && $selectedKeyframe.id;
  $: isSelected = selectedId === keyframe.id;

  function onSelect() {
    dispatch("select", keyframe);
  }

  function onPanMove({ detail }) {
    dispatch("move", { keyframe, offset: detail.dx / $scale });
  }

  function onMouseUp(event) {
    if (event.which === 3 && event.detail === 2) {
      dispatch("remove", keyframe);
    }
  }

  function onDurationMove({ detail }) {
    dispatch("duration", { keyframe, offset: detail.dx / $scale });
  }
</script>

<!-- Duration bar -->
<div
  class="keyframe-duration"
  class:selected={isSelected}
  style="left:{left + halfWidth}px;width:{width}px;"
>
  <div
    use:pannable
    on:panmove={onDurationMove}
    on:mousedown|stopPropagation
    class="duration-handle"
  ></div>
</div>

<!-- Keyframe diamond -->
<div class="keyframe-marker" style="left:{left}px">
  <div
    use:pannable
    on:panmove={onPanMove}
    on:mouseup={onMouseUp}
    on:mousedown|stopPropagation={onSelect}
    class="keyframe-diamond"
    class:selected={isSelected}
  ></div>
</div>

<style>
  .keyframe-duration {
    position: absolute;
    z-index: 10;
    height: 28px;
    background: linear-gradient(
      90deg,
      rgba(99, 102, 241, 0.2),
      rgba(99, 102, 241, 0.1)
    );
    border-radius: 4px;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .keyframe-duration.selected {
    background: linear-gradient(
      90deg,
      rgba(139, 92, 246, 0.3),
      rgba(139, 92, 246, 0.15)
    );
    border-color: rgba(139, 92, 246, 0.5);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.2);
  }

  .duration-handle {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 0 4px 4px 0;
    cursor: ew-resize;
    transition: background 150ms ease;
  }

  .duration-handle:hover {
    background: rgba(139, 92, 246, 0.5);
  }

  .keyframe-marker {
    position: absolute;
    z-index: 20;
  }

  .keyframe-diamond {
    width: 18px;
    height: 18px;
    transform: rotate(45deg);
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    cursor: grab;
    transition: all 150ms ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  }

  .keyframe-diamond:hover {
    transform: rotate(45deg) scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
  }

  .keyframe-diamond.selected {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow:
      0 0 0 2px rgba(139, 92, 246, 0.3),
      0 4px 16px rgba(139, 92, 246, 0.5);
  }

  .keyframe-diamond:active {
    cursor: grabbing;
  }
</style>
