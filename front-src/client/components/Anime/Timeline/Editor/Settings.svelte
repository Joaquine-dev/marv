<script>
  import { _ } from "@/libs/i18next";
  import { getContext } from "svelte";
  import AnimeIcon from "./AnimeIcon.svelte";
  import Section from "./Settings/Section.svelte";
  import InfoPanel from "./Settings/Panels/Info.svelte";
  import AttrsPanel from "./Settings/Panels/Attrs.svelte";
  import StylePanel from "./Settings/Panels/Style.svelte";
  import TransPanel from "./Settings/Panels/Trans.svelte";
  import Keyframe from "./Settings/Keyframe.svelte";

  import Icon from "@/components/UI/Icon.svelte";
  import MdAdjust from "svelte-icons/md/MdAdjust.svelte";

  const { items, selectedItem, selectedKeyframe } = getContext("Editor");

  $: info = $selectedItem ? Object.entries($selectedItem.target.info) : [];
  $: attrs = $selectedItem ? Object.entries($selectedItem.target.attrs) : [];
  $: style = $selectedItem ? Object.entries($selectedItem.target.style) : [];
  $: trans = $selectedItem ? Object.entries($selectedItem.target.trans) : [];
  $: isAudio = $selectedItem && $selectedItem.target.type === "audio";
  $: isVideo = $selectedItem && $selectedItem.target.type === "video";
  $: hasAttrs = isAudio || isVideo;
  $: hasStyle = !isAudio;
  $: hasTrans = !isAudio;

  function onChange(type, { detail }) {
    const { key, value } = detail;
    // TODO check value, min, max, etc...
    $selectedItem.target[type][key] = value;
    $items = $items;
  }

  function onRemove(type, { detail }) {
    const { key } = detail;
    delete $selectedItem.target[type][key];
    $selectedItem = $selectedItem;
    $items = $items;
  }
</script>

<div class="settings-panel">
  {#if $selectedItem}
    <Section>
      <div slot="title" class="section-title">
        <div class="section-icon">
          <AnimeIcon type={$selectedItem.target.type} />
        </div>
        <span class="section-name">{$selectedItem.target.filename}</span>
      </div>
      <InfoPanel info={info} />
      <AttrsPanel
        attrs={attrs}
        visible={hasAttrs}
        on:change={onChange.bind(null, 'attrs')}
        on:remove={onRemove.bind(null, 'attrs')}
      />
      <StylePanel
        style={style}
        visible={hasStyle}
        on:change={onChange.bind(null, 'style')}
        on:remove={onRemove.bind(null, 'style')}
      />
      <TransPanel
        trans={trans}
        visible={hasTrans}
        on:change={onChange.bind(null, 'trans')}
        on:remove={onRemove.bind(null, 'trans')}
      />
    </Section>

    <Section visible={$selectedKeyframe}>
      <div slot="title" class="section-title">
        <div class="section-icon keyframe">
          <Icon icon={MdAdjust} class="w-4 h-4" />
        </div>
        <span class="section-name">{_('words.keyframe')}</span>
      </div>
      <Keyframe />
    </Section>
  {:else if $items.length}
    <div class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z" stroke-linecap="round"/>
        </svg>
      </div>
      <p>{_('sentences.no-file-selected')}</p>
    </div>
  {:else}
    <div class="empty-state">
      <div class="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 4v16m-8-8h16" stroke-linecap="round"/>
        </svg>
      </div>
      <p>{_('sentences.no-file-added')}</p>
    </div>
  {/if}
</div>

<style>
  .settings-panel {
    height: 100%;
    overflow-y: auto;
    background: var(--color-surface, #141416);
  }

  .settings-panel::-webkit-scrollbar {
    width: 6px;
  }

  .settings-panel::-webkit-scrollbar-track {
    background: transparent;
  }

  .settings-panel::-webkit-scrollbar-thumb {
    background: var(--color-border, #2a2a2d);
    border-radius: 3px;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .section-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--color-background, #0a0a0b);
    border-radius: 6px;
    color: var(--color-text-muted, #71717a);
    flex-shrink: 0;
  }

  .section-icon.keyframe {
    background: rgba(139, 92, 246, 0.15);
    color: var(--color-accent, #8b5cf6);
  }

  .section-name {
    font-weight: 500;
    color: var(--color-text-primary, #fafafa);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 1.5rem;
    text-align: center;
  }

  .empty-icon {
    width: 48px;
    height: 48px;
    padding: 0.75rem;
    background: var(--color-background, #0a0a0b);
    border: 1px dashed var(--color-border, #2a2a2d);
    border-radius: 12px;
    color: var(--color-text-muted, #71717a);
  }

  .empty-state p {
    font-size: 13px;
    color: var(--color-text-muted, #71717a);
  }
</style>
