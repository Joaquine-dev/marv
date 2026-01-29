<script>
  /**
   * Progressbar - Modern Glass Design System
   * Animated progress indicator with glow effect
   */
  export let percent = 0;
  export let height = 3;
  export let color = "";
  export let bgColor = "";
  export let glow = false;
</script>

<div class="progressbar" style="height:{height}px; {bgColor ? `background-color:${bgColor}` : ''}">
  <div
    class="progress-fill"
    class:glow
    style="width:{percent}%; {color ? `background-color:${color}` : ''}"
  ></div>
</div>

<style>
  .progressbar {
    width: 100%;
    background: var(--color-background, #0a0a0b);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--color-accent-secondary, #6366f1),
      var(--color-accent, #8b5cf6)
    );
    border-radius: 0 2px 2px 0;
    transition: width 100ms ease-out;
  }

  .progress-fill.glow {
    box-shadow:
      0 0 8px rgba(139, 92, 246, 0.5),
      0 0 16px rgba(139, 92, 246, 0.3);
  }
</style>
