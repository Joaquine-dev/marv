<script>
  /**
   * Flexbar - Modern Glass Design System
   * Horizontal bar container with glass effect
   */
  export let bgColor = "";
  export let glass = false;
</script>

<div class="flexbar {bgColor}" class:glass>
  <slot />
</div>

<style>
  .flexbar {
    display: flex;
    align-items: center;
    background: var(--color-surface, #141416);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .flexbar.glass {
    background: rgba(20, 20, 22, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
</style>
