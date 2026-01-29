<script>
  /**
   * OBS Status - Modern Glass Design System
   * Shows OBS connection status and stream stats
   */
  import { _ } from "@/libs/i18next";
  import { state } from "@/stores/obs";

  let fps = "0";
  let cpu = "0";
  let mem = "0";

  let off = _("words.off");

  function timecode(type) {
    const timecode = $state.status[`${type}-timecode`];
    return (timecode && timecode.split(".")[0]) || off;
  }

  function getStatusInfo({ connected, connecting }) {
    if (connected) {
      return { status: "connected", label: _("words.connected") };
    } else if (connecting) {
      return { status: "connecting", label: `${_("sentences.waiting-for-connexion")}...` };
    } else {
      return { status: "disconnected", label: _("words.disconnected") };
    }
  }

  $: if ($state.streaming && $state.status["fps"]) {
    fps = parseInt($state.status["fps"]);
    mem = parseInt($state.status["memory-usage"]);
    cpu = parseFloat($state.status["cpu-usage"]).toFixed(1);
  }

  $: streamingTimecode = $state.streaming ? timecode("stream") : off;
  $: recordingTimecode = $state.recording ? timecode("rec") : off;
  $: statusInfo = getStatusInfo($state);
</script>

<div class="obs-status">
  {#if !$state.connected}
    <!-- Disconnected state -->
    <div class="status-indicator" class:connecting={$state.connecting}>
      <span
        class="status-dot"
        class:bg-error={!$state.connecting}
        class:bg-warning={$state.connecting}
        class:pulse={$state.connecting}
      />
      <span class="status-text">OBS</span>
      <span class="status-label">{statusInfo.label}</span>
    </div>
  {/if}

  {#if $state.connected}
    <!-- Recording badge -->
    <div class="stat-badge" class:active={$state.recording}>
      <span
        class="badge-dot"
        class:bg-error={$state.recording}
        class:pulse={$state.recording}
      />
      <span class="badge-label">{_('words.recording')}</span>
      <span class="badge-value">{recordingTimecode}</span>
    </div>

    <!-- Live badge -->
    <div class="stat-badge" class:active={$state.streaming}>
      <span
        class="badge-dot"
        class:bg-success={$state.streaming}
        class:pulse={$state.streaming}
      />
      <span class="badge-label">{_('words.live')}</span>
      <span class="badge-value">{streamingTimecode}</span>
    </div>
  {/if}

  {#if $state.connected && $state.streaming}
    <!-- Stats badges -->
    <div class="stat-badge stats hidden sm:flex">
      <span class="badge-label">FPS</span>
      <span class="badge-value">{fps}</span>
    </div>
    <div class="stat-badge stats hidden sm:flex">
      <span class="badge-label">MEM</span>
      <span class="badge-value">{mem} MB</span>
    </div>
    <div class="stat-badge stats hidden sm:flex">
      <span class="badge-label">CPU</span>
      <span class="badge-value">{cpu}%</span>
    </div>
  {/if}
</div>

<style>
  .obs-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    padding-left: 0;
  }

  /* Disconnected status indicator */
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 13px;
    color: var(--color-text-secondary, #a1a1aa);
  }

  .status-indicator.connecting {
    color: var(--color-warning, #f59e0b);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-text-muted, #71717a);
  }

  .status-dot.pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .status-text {
    font-weight: 600;
  }

  .status-label {
    opacity: 0.8;
    text-transform: lowercase;
  }

  /* Stat badges */
  .stat-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    font-size: 12px;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 6px;
    color: var(--color-text-secondary, #a1a1aa);
    transition: all 150ms ease;
  }

  .stat-badge.active {
    border-color: var(--color-border-accent, rgba(139, 92, 246, 0.3));
  }

  .stat-badge.stats {
    background: transparent;
    border-color: transparent;
    padding: 0.25rem 0.5rem;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-text-muted, #71717a);
    flex-shrink: 0;
  }

  .badge-dot.pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }

  .badge-label {
    font-weight: 500;
    color: var(--color-text-muted, #71717a);
  }

  .badge-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-primary, #fafafa);
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(0.85);
    }
  }
</style>
