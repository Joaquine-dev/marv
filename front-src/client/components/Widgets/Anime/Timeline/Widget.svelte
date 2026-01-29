<script>
  /**
   * Anime Timeline Widget - Modern Glass Design System
   * Trigger animation playback with visual feedback
   */
  import api from "@/api/actions";
  import WidgetWrapper from "@/components/Widgets/WidgetWrapper.svelte";

  export let widget;

  let isTriggered = false;

  function triggerAction() {
    isTriggered = true;
    api.push({ type: "anime", widget })
      .catch((error) => {
        console.log(">>>Error:", error);
      })
      .finally(() => {
        setTimeout(() => { isTriggered = false; }, 300);
      });
  }
</script>

<WidgetWrapper
  widget={widget}
  on:click={triggerAction}
  class="timeline-widget {isTriggered ? 'triggered' : ''}"
>
  <div class="play-indicator">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  </div>
</WidgetWrapper>

<style>
  :global(.timeline-widget) {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2) !important;
    transition: all 150ms ease;
  }

  :global(.timeline-widget:hover) {
    background: rgba(139, 92, 246, 0.1) !important;
  }

  :global(.timeline-widget.triggered) {
    background: rgba(139, 92, 246, 0.2) !important;
  }

  .play-indicator {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 150ms ease;
  }

  .play-indicator svg {
    width: 40%;
    height: 40%;
    max-width: 64px;
    max-height: 64px;
    color: var(--color-accent, #8b5cf6);
    filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5));
  }

  :global(.timeline-widget:hover) .play-indicator {
    opacity: 0.3;
  }

  :global(.timeline-widget.triggered) .play-indicator {
    opacity: 0.8;
    animation: pulse-scale 300ms ease;
  }

  @keyframes pulse-scale {
    0% { transform: scale(0.8); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }
</style>
