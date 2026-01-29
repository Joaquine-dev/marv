<script>
  /**
   * Anime Timeline Settings - Modern Glass Design System
   * Settings panel with timeline editor launcher
   */
  import { _ } from "@/libs/i18next";
  import filesAPI from "@/api/files";
  import actionsAPI from "@/api/actions";
  import Button from "@/components/UI/Button.svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdOpenInNew from "svelte-icons/md/MdOpenInNew.svelte";
  import Editor from "@/components/Anime/Timeline/Editor.svelte";

  export let data;

  let widget = null;
  let initialItems = [];
  let timelineOpened = false;

  $: widget = data.widget;
  $: widget && fetchItems();
  $: itemCount = initialItems.length;

  function fetchItems() {
    actionsAPI.get(widget.id).then(({ items } = {}) => {
      if (items) initialItems = items;
    });
  }

  function openTimeline() {
    timelineOpened = true;
  }

  function closeTimeline() {
    timelineOpened = false;
    fetchItems();
  }

  function onAnimeUpdate({ detail: anime }) {
    actionsAPI.update({ widget, anime });
  }

  async function onTextFileChange({ detail }) {
    await filesAPI.update(detail.item.target.filename, detail.text);
  }
</script>

<div class="timeline-settings">
  <div class="settings-info">
    <span class="info-label">Éléments</span>
    <span class="info-value">{itemCount}</span>
  </div>

  <button class="open-editor-btn" on:click={openTimeline}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
      <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>{_('sentences.open-anime-timeline')}</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-arrow">
      <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>

{#if timelineOpened}
  <Overlay>
    <Editor
      widget={widget}
      initialItems={initialItems}
      on:close={closeTimeline}
      on:update={onAnimeUpdate}
      on:textFileChange={onTextFileChange}
    />
  </Overlay>
{/if}

<style>
  .timeline-settings {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .settings-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 0.875rem;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 8px;
  }

  .info-label {
    font-size: 13px;
    color: var(--color-text-muted, #71717a);
  }

  .info-value {
    font-size: 14px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--color-text-primary, #fafafa);
  }

  .open-editor-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1));
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    color: var(--color-text-primary, #fafafa);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .open-editor-btn:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.15));
    border-color: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  }

  .btn-icon {
    width: 20px;
    height: 20px;
    color: var(--color-accent, #8b5cf6);
    flex-shrink: 0;
  }

  .open-editor-btn span {
    flex: 1;
    text-align: left;
  }

  .btn-arrow {
    width: 16px;
    height: 16px;
    color: var(--color-text-muted, #71717a);
    transition: transform 150ms ease;
  }

  .open-editor-btn:hover .btn-arrow {
    transform: translateX(2px);
    color: var(--color-accent, #8b5cf6);
  }
</style>
