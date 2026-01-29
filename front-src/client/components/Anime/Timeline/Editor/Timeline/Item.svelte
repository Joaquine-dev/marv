<script>
  import { getContext } from "svelte";
  import Keyframe from "./Keyframe.svelte";
  import Keyframes from "./Keyframes.svelte";
  import AnimeIcon from "../AnimeIcon.svelte";
  import ItemButtons from "./ItemButtons.svelte";
  import SortableItem from "./SortableItem.svelte";
  import ItemMenu from "@/components/UI/ItemMenu.svelte";
  import { createKeyframe } from "../../libs/createKeyframe";

  export let item;
  export let index;
  export let widget;

  const { items, selectedItem, selectedKeyframe, pixelPerMs } = getContext(
    "Editor"
  );

  $: isSelected = $selectedItem && $selectedItem.id === item.id;
  $: selected = isSelected ? "bg-blue-600 bg-opacity-50" : "bg-primary-darker";

  function selectItem(item) {
    if (!$selectedItem || $selectedItem.id !== item.id) {
      $selectedKeyframe = null;
      $selectedItem = item;
    }
  }

  function selectKeyframe(keyframe) {
    if (!$selectedKeyframe || $selectedKeyframe.id !== keyframe.id) {
      $selectedKeyframe = keyframe;
    }
  }

  function onSelect() {
    selectItem(item);
  }

  function getScaledValue(delay) {
    return Math.round(delay * pixelPerMs);
  }

  function addKeyframe(props) {
    const keyframe = createKeyframe(props);
    item.keyframes = [...item.keyframes, keyframe];
    selectItem(item);
    selectKeyframe(keyframe);
    $items = $items;
  }

  function onAddKeyframe({ detail }) {
    addKeyframe({ delay: getScaledValue(detail.offset) });
  }

  function onSelectKeyframe({ detail: keyframe }) {
    selectItem(item);
    selectKeyframe(keyframe);
  }

  function onMoveKeyframe({ detail }) {
    const { keyframe, offset } = detail;
    const delay = keyframe.delay + getScaledValue(offset);
    keyframe.delay = Math.max(0, delay);
    $selectedKeyframe = keyframe;
    $items = $items;
  }

  function onRemoveKeyframe({ detail: keyframe }) {
    item.keyframes = item.keyframes.filter((kf) => kf.id !== keyframe.id);
    $selectedKeyframe = null;
    $items = $items;
  }

  function ondurationChange({ detail }) {
    const { keyframe, offset } = detail;
    const duration = keyframe.duration + getScaledValue(offset);
    keyframe.duration = Math.max(0, duration);
    $selectedKeyframe = keyframe;
    $items = $items;
  }
</script>

<SortableItem
  index={index}
  on:click={onSelect}
  class="track-item {isSelected ? 'selected' : ''}"
>
  <div class="track-icon">
    <AnimeIcon type={item.target.type} />
  </div>
  <div class="track-name">{item.target.filename}</div>

  <ItemMenu>
    <ItemButtons
      on:remove
      on:duplicate
      on:fileUpdate
      on:textFileChange
      widget={widget}
      item={item}
    />
  </ItemMenu>

  <div
    slot="dragOver"
    class="drop-indicator"
  ></div>
</SortableItem>

<Keyframes on:add="{onAddKeyframe}" selected="{isSelected}">
  {#each item.keyframes as keyframe (keyframe.id)}
    <Keyframe
      keyframe="{keyframe}"
      on:move="{onMoveKeyframe}"
      on:select="{onSelectKeyframe}"
      on:remove="{onRemoveKeyframe}"
      on:duration="{ondurationChange}"
    />
  {/each}
</Keyframes>

<style>
  :global(.track-item) {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: var(--color-surface, #141416);
    transition: all 150ms ease;
  }

  :global(.track-item:hover) {
    background: var(--color-elevated, #1c1c1f);
  }

  :global(.track-item.selected) {
    background: rgba(139, 92, 246, 0.15);
    border-left: 3px solid var(--color-accent, #8b5cf6);
    padding-left: calc(0.75rem - 3px);
  }

  :global(.track-icon) {
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

  :global(.track-item.selected .track-icon) {
    background: rgba(139, 92, 246, 0.2);
    color: var(--color-accent, #8b5cf6);
  }

  :global(.track-name) {
    flex: 1;
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-secondary, #a1a1aa);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :global(.track-item.selected .track-name) {
    color: var(--color-text-primary, #fafafa);
  }

  :global(.drop-indicator) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--color-accent, #8b5cf6);
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
  }
</style>
