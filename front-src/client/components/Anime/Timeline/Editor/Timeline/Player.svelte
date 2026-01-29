<script>
  /**
   * Timeline Player - Modern Glass Design System
   * Playback controls with modern styling
   */
  import Icon from "@/components/UI/Icon.svelte";
  import MdPause from "svelte-icons/md/MdPause.svelte";
  import MdReplay from "svelte-icons/md/MdReplay.svelte";
  import MdPlayArrow from "svelte-icons/md/MdPlayArrow.svelte";
  import MdSkipPrevious from "svelte-icons/md/MdSkipPrevious.svelte";

  import { getContext } from "svelte";
  const { seek, items, paused } = getContext("Editor");

  export let anime = null;

  function updateText() {
    $items = $items;
  }

  function playAnime() {
    anime && updateText();
    anime && anime.play();
  }

  function restartAnime() {
    anime && updateText();
    anime && anime.restart();
  }

  function pauseAnime() {
    anime && anime.pause();
    $paused = true;
  }

  function resetAnime() {
    seek.set(0);
    $paused = true;
    anime && anime.reset();
  }

  $: isReady = !!anime;
</script>

<div class="player-controls" class:ready={isReady}>
  <button
    type="button"
    class="player-btn"
    on:click={restartAnime}
    disabled={!isReady}
    title="Rejouer"
  >
    <Icon icon={MdReplay} size="18px" />
  </button>

  <button
    type="button"
    class="player-btn"
    on:click={resetAnime}
    disabled={!isReady}
    title="Retour au début"
  >
    <Icon icon={MdSkipPrevious} size="18px" />
  </button>

  <button
    type="button"
    class="player-btn play-btn"
    class:playing={!$paused}
    on:click={$paused ? playAnime : pauseAnime}
    disabled={!isReady}
    title={$paused ? 'Lecture' : 'Pause'}
  >
    {#if $paused}
      <Icon icon={MdPlayArrow} size="20px" />
    {:else}
      <Icon icon={MdPause} size="20px" />
    {/if}
  </button>
</div>

<style>
  .player-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem;
    background: var(--color-background, #0a0a0b);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 10px;
  }

  .player-controls.ready {
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.1);
  }

  .player-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--color-text-muted, #71717a);
    cursor: pointer;
    transition: all 150ms ease;
  }

  .player-btn:hover:not(:disabled) {
    background: rgba(139, 92, 246, 0.1);
    color: var(--color-accent, #8b5cf6);
  }

  .player-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .player-btn.play-btn {
    width: 36px;
    height: 36px;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
  }

  .player-btn.play-btn:hover:not(:disabled) {
    background: var(--color-accent, #8b5cf6);
    border-color: var(--color-accent, #8b5cf6);
    color: white;
    box-shadow: 0 0 16px rgba(139, 92, 246, 0.4);
  }

  .player-btn.play-btn.playing {
    background: var(--color-success, #10b981);
    border-color: var(--color-success, #10b981);
    color: white;
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
    }
  }
</style>
