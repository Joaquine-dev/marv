<script>
  import api from "@/api/actions";
  import { _ } from "@/libs/i18next";
  import pannable from "@/libs/svelte/pannable.js";
  import Button from "@/components/UI/Button.svelte";
  import EventSelect from "./Timeline/EventSelect.svelte";
  import { onMount, onDestroy, getContext } from "svelte";
  import ColorPicker from "@/components/UI/ColorPicker.svelte";

  const { fakeEvent } = getContext("Editor");

  const localSize = JSON.parse(
    localStorage.getItem("anime.viewer.size") || "{}"
  );

  export let widget;
  export let size = {
    width: localSize.width || window.screen.width,
    height: localSize.height || window.screen.height,
  };

  export let position = { top: 0, left: 0 };
  export let zoom = { scale: 1, min: 0.1, max: 10, sensitivity: 50 };

  let viewportWrapper;

  let bgColor = localStorage.getItem("anime.viewer.bgColor") || "#111";

  $: viewportStyle = `
    top:${position.top}px;
    left:${position.left}px;
    width:${size.width}px;
    height:${size.height}px;
    background-color: ${bgColor};
    transform-origin:0 0;
    transform:scale(${zoom.scale});
    outline: ${2 / zoom.scale}px rgba(255,255,255,.1) solid;
  `;

  function viewportPan({ top = 0, left = 0 } = {}) {
    position.top += top;
    position.left += left;
  }

  function computeTranslation(scale) {
    const ratio = 1 - scale / zoom.scale;
    const { top, left } = viewportWrapper.getBoundingClientRect();
    return {
      top: (event.clientY - position.top - top) * ratio,
      left: (event.clientX - position.left - left) * ratio,
    };
  }

  function computeScale(delta) {
    const newScale = zoom.scale + delta / (zoom.sensitivity / zoom.scale);
    return Math.max(zoom.min, Math.min(newScale, zoom.max));
  }

  function viewportFitToScreen() {
    const padding = 50;
    const wrapper = viewportWrapper.getBoundingClientRect();
    const wRatio = (wrapper.width - padding) / size.width;
    const hRatio = (wrapper.height - padding) / size.height;

    zoom.scale = Math.min(wRatio, hRatio);
    position.top = wrapper.height / 2 - (size.height * zoom.scale) / 2;
    position.left = wrapper.width / 2 - (size.width * zoom.scale) / 2;

    localStorage.setItem("anime.viewer.size", JSON.stringify(size));
  }

  function viewportZoom(delta) {
    const scale = computeScale(delta);
    viewportPan(computeTranslation(scale));
    zoom.scale = scale;
  }

  function onPanMove({ detail }) {
    viewportPan({ top: detail.dy, left: detail.dx });
  }

  function onWheel(event) {
    viewportZoom(-event.deltaY / 100);
  }

  function onDoubleClick() {
    viewportFitToScreen();
  }

  onMount(() => {
    setTimeout(viewportFitToScreen, 42);
    window.addEventListener("resize", viewportFitToScreen);
  });

  onDestroy(() => {
    window.removeEventListener("resize", viewportFitToScreen);
  });

  function onBackgroundColor({ detail: color }) {
    bgColor = color.hex;
    localStorage.setItem("anime.viewer.bgColor", bgColor);
  }

  function onPlay() {
    api
      .push({ type: "anime", widget, fakeEvent: $fakeEvent })
      .catch((error) => {
        console.log(">>>Error:", error);
      });
  }
</script>

<div class="viewer-container">
  <!-- Header toolbar -->
  <div class="viewer-toolbar">
    <slot name="header" />
    <EventSelect widget={widget} showLabel={false} />
    <button class="test-btn" on:click={onPlay}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M8 5v14l11-7z"/>
      </svg>
      {_('words.test')}
    </button>
    <div class="toolbar-separator"></div>
    <ColorPicker
      label={_('words.color')}
      on:color={onBackgroundColor}
      previewClass="w-8 h-8 rounded"
      color={bgColor}
    />
    <div class="size-input">
      <label>{_('words.width')}</label>
      <input
        type="number"
        min="42"
        bind:value={size.width}
        on:change={viewportFitToScreen}
      />
    </div>
    <div class="size-input">
      <label>{_('words.height')}</label>
      <input
        type="number"
        min="42"
        bind:value={size.height}
        on:change={viewportFitToScreen}
      />
    </div>
  </div>

  <!-- Viewport -->
  <div
    class="viewer-viewport"
    use:pannable
    on:panmove={onPanMove}
    on:wheel={onWheel}
    on:dblclick={onDoubleClick}
    bind:this={viewportWrapper}
  >
    <div class="viewer-canvas" style={viewportStyle}>
      <slot />
    </div>
  </div>
</div>

<style>
  .viewer-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .viewer-toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--color-elevated, #1c1c1f);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .test-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #ec4899, #be185d);
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .test-btn:hover {
    background: linear-gradient(135deg, #f472b6, #db2777);
    box-shadow: 0 0 16px rgba(236, 72, 153, 0.4);
    transform: translateY(-1px);
  }

  .test-btn:active {
    transform: translateY(0);
  }

  .toolbar-separator {
    width: 1px;
    height: 24px;
    background: var(--color-border, #2a2a2d);
    margin: 0 0.25rem;
  }

  .size-input {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .size-input label {
    font-size: 12px;
    color: var(--color-text-muted, #71717a);
    white-space: nowrap;
  }

  .size-input input {
    width: 70px;
    padding: 0.375rem 0.5rem;
    background: var(--color-background, #0a0a0b);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 4px;
    color: var(--color-text-primary, #fafafa);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
  }

  .size-input input:focus {
    outline: none;
    border-color: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }

  .viewer-viewport {
    position: relative;
    flex: 1;
    overflow: hidden;
    background:
      radial-gradient(circle at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.02) 20px,
        rgba(255, 255, 255, 0.02) 21px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.02) 20px,
        rgba(255, 255, 255, 0.02) 21px
      );
    cursor: grab;
  }

  .viewer-viewport:active {
    cursor: grabbing;
  }

  .viewer-canvas {
    position: absolute;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
</style>
