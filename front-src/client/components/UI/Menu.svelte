<!--
  Menu - Modern Glass Design System
  Context menu container with glass effect
-->
<div class="menu">
  <slot />
</div>

<style>
  .menu {
    display: flex;
    flex-direction: column;
    padding: 0.375rem;
    background: rgba(20, 20, 22, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 8px;
    color: var(--color-text-primary, #fafafa);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.3),
      0 2px 4px -2px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  }
</style>
