<script>
  /**
   * Timeline Editor Layout - Modern Glass Design System
   * Main layout with resizable panes
   */
  import Splitter from "@/components/UI/Splitter.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let isDragOver = false;

  function onDrop(event) {
    event.preventDefault();
    isDragOver = false;
    dispatch("dropFiles", [...event.dataTransfer.files]);
  }

  function onDragEnter() {
    isDragOver = true;
  }

  function onDragLeave(e) {
    if (e.currentTarget === e.target) {
      isDragOver = false;
    }
  }
</script>

<div
  on:drop={onDrop}
  on:dragover|preventDefault
  on:dragenter={onDragEnter}
  on:dragleave={onDragLeave}
  class="editor-layout"
  class:drag-over={isDragOver}
>
  <Splitter flex="col" sizes="{[72, 28]}" save="editor.main.col">
    <div slot="a" class="h-full">
      <Splitter flex="row" sizes="{[72, 28]}" save="editor.main.row">
        <div slot="a" class="pane-left">
          <slot name="leftPane" />
          <slot />
        </div>
        <div slot="b" class="pane-right">
          <slot name="rightPane" />
        </div>
      </Splitter>
    </div>
    <div slot="b" class="pane-bottom">
      <slot name="bottomPane" />
    </div>
  </Splitter>

  {#if isDragOver}
    <div class="drop-overlay">
      <div class="drop-zone">
        <div class="drop-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="drop-text">Déposer les fichiers ici</span>
      </div>
    </div>
  {/if}
</div>

<style>
  .editor-layout {
    position: absolute;
    z-index: 10;
    inset: 0;
    background: var(--color-background, #0a0a0b);
    color: var(--color-text-primary, #fafafa);
    user-select: none;
  }

  .pane-left {
    height: 100%;
    background: var(--color-background, #0a0a0b);
    border-right: 1px solid var(--color-border, #2a2a2d);
  }

  .pane-right {
    height: 100%;
    background: var(--color-surface, #141416);
    overflow: auto;
  }

  .pane-bottom {
    height: 100%;
    background: var(--color-surface, #141416);
    border-top: 1px solid var(--color-border, #2a2a2d);
  }

  /* Drop overlay */
  .drop-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 10, 11, 0.9);
    backdrop-filter: blur(8px);
  }

  .drop-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 3rem 4rem;
    border: 2px dashed var(--color-accent, #8b5cf6);
    border-radius: 16px;
    background: rgba(139, 92, 246, 0.05);
  }

  .drop-icon {
    width: 64px;
    height: 64px;
    color: var(--color-accent, #8b5cf6);
    animation: bounce 1s ease infinite;
  }

  .drop-text {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--color-text-secondary, #a1a1aa);
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .editor-layout.drag-over {
    border: 2px solid var(--color-accent, #8b5cf6);
  }
</style>
