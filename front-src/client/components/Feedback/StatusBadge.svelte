<script>
  /**
   * StatusBadge - Modern Glass Design System
   * Connection status indicator with pulse animation
   */

  // Status: 'connected' | 'disconnected' | 'connecting' | 'error'
  export let status = "disconnected";

  // Label to display
  export let label = "";

  // Size: 'sm' | 'md'
  export let size = "md";

  // Show label text
  export let showLabel = true;

  const statusConfig = {
    connected: {
      color: "bg-success",
      glow: "shadow-[0_0_8px_rgba(16,185,129,0.5)]",
      text: "text-success",
      pulse: false,
    },
    disconnected: {
      color: "bg-text-muted",
      glow: "",
      text: "text-text-muted",
      pulse: false,
    },
    connecting: {
      color: "bg-warning",
      glow: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
      text: "text-warning",
      pulse: true,
    },
    error: {
      color: "bg-error",
      glow: "shadow-[0_0_8px_rgba(244,63,94,0.5)]",
      text: "text-error",
      pulse: true,
    },
  };

  $: config = statusConfig[status] || statusConfig.disconnected;

  const sizes = {
    sm: { dot: "w-2 h-2", text: "text-xs" },
    md: { dot: "w-2.5 h-2.5", text: "text-sm" },
  };

  $: sizeConfig = sizes[size] || sizes.md;
</script>

<div class="status-badge" class:with-label={showLabel && label}>
  <div
    class="status-dot {sizeConfig.dot} {config.color} {config.glow}"
    class:pulse={config.pulse}
  />
  {#if showLabel && label}
    <span class="status-label {sizeConfig.text} {config.text}">
      {label}
    </span>
  {/if}
</div>

<style>
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-dot {
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-dot.pulse {
    animation: status-pulse 1.5s ease-in-out infinite;
  }

  .status-label {
    font-weight: 500;
    white-space: nowrap;
  }

  @keyframes status-pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(0.9);
    }
  }
</style>
