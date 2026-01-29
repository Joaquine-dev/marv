<script>
  /**
   * WidgetWrapper - Modern Glass Design System
   * Main widget container with action queue visualization
   */
  import ms from "ms";
  import api from "@/api/actions";
  import { store } from "@/stores/actions";
  import Label from "./WidgetLabel.svelte";
  import Progressbar from "@/components/UI/Progressbar.svelte";
  import MdAutorenew from "svelte-icons/md/MdAutorenew.svelte";

  export let widget;

  export let cls = "";
  export { cls as class };

  let countdownId = 0;
  let elapsedTime = -1;
  let totalDuration = 0;
  let elapsedPercent = 0;
  let totalElapsedTime = 0;

  $: action = $store[widget.id] || {};

  function isOwner(action) {
    return action.widget.id === widget.id;
  }

  function isImmediat(action) {
    return action.widget.trigger === "immediat";
  }

  function clearCountdownInterval() {
    clearInterval(countdownId);
    countdownId = null;
    elapsedTime = -1;
  }

  function countdownInterval(duration, delay, tick) {
    clearCountdownInterval();
    let elapsed = duration;
    countdownId = setInterval(() => {
      elapsed = Math.max(0, elapsed - delay);
      tick({ elapsed, delay });
      if (elapsed === 0) clearCountdownInterval();
    }, delay);
  }

  function minMax(min, max, value) {
    return Math.max(min, Math.min(max, value));
  }

  function percent(value, total) {
    return minMax(0, 100, Math.round((value / total) * 100));
  }

  function onTick({ elapsed, delay }) {
    elapsedTime = elapsed;
    totalElapsedTime += delay;
    elapsedPercent = percent(totalElapsedTime, totalDuration);
  }

  api.on("push", (action) => {
    if (!isOwner(action)) return;
    if (isImmediat(action)) {
      clearCountdownInterval();
      totalElapsedTime = 0;
      totalDuration = action.duration;
    } else {
      totalDuration += action.duration;
    }
  });

  api.on("start", (action) => {
    if (!isOwner(action)) return;
    countdownInterval(action.duration, 100, onTick);
  });

  api.on("end", (action) => {
    if (!isOwner(action)) return;
    if (!isImmediat(action)) {
      clearCountdownInterval();
    }
    if (action.inQueue === 0) {
      totalElapsedTime = 0;
      totalDuration = 0;
    }
  });
</script>

<div on:click class="widget-wrapper {cls}">
  <Label widget={widget} />
  <div class="widget-body">
    <slot />
  </div>
  <slot name="overlay" />
</div>

{#if action && action.inQueue}
  <div class="action-overlay" class:running={action.running}>
    {#if action.running}
      <div class="spinner">
        <MdAutorenew />
      </div>
      {#if elapsedTime > -1}
        <div class="elapsed-time">
          {ms(elapsedTime)}
        </div>
      {/if}
    {/if}
    <div class="queue-count">
      <span class="count-badge" class:active={action.running}>
        {action.inQueue}
      </span>
    </div>
    <div class="progress-bar">
      <Progressbar percent={100 - elapsedPercent} />
    </div>
  </div>
{/if}

<style>
  .widget-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 8px;
    transition: all 150ms ease;
  }

  .widget-wrapper:hover {
    border-color: var(--color-border-hover, #3f3f46);
  }

  .widget-body {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  /* Action overlay */
  .action-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border: 2px solid var(--color-accent, #8b5cf6);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(139, 92, 246, 0.05);
  }

  .action-overlay.running {
    box-shadow:
      inset 0 0 20px rgba(139, 92, 246, 0.1),
      0 0 20px rgba(139, 92, 246, 0.2);
  }

  .spinner {
    display: flex;
    width: 100%;
    height: 100%;
    color: var(--color-accent, #8b5cf6);
    opacity: 0.4;
    animation: spin 1s linear infinite;
  }

  .elapsed-time {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.375rem 0.5rem;
    font-size: 11px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-muted, #71717a);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0 4px 0 0;
  }

  .queue-count {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .count-badge {
    padding: 0.25rem 1rem;
    color: var(--color-text-primary, #fafafa);
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 9999px;
    transition: all 150ms ease;
  }

  .count-badge.active {
    color: var(--color-accent, #8b5cf6);
    background: transparent;
    border-color: transparent;
    text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  }

  .progress-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
