<script>
  import Grid from "svelte-grid";
  import Widget from "./Widget.svelte";
  import { update } from "@/libs/panels";
  import { onMount, onDestroy } from "svelte";
  import { gridOptions, selectedWidget } from "@/stores/panels";

  export let panel;

  function onChange() {
    update(panel);
  }

  function hide() {
    selectedWidget.set(null);
  }

  onMount(() => document.addEventListener("mousedown", hide));
  onDestroy(() => document.removeEventListener("mousedown", hide));
</script>

<style>
  /* Grid shadow - Modern Glass Design System */
  :global(.svlt-grid-shadow) {
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.15),
      rgba(99, 102, 241, 0.1)
    );
    border: 2px dashed rgba(139, 92, 246, 0.3);
    border-radius: 8px;
    backdrop-filter: blur(4px);
  }

  :global(.svlt-grid-container) {
    background: transparent;
  }

  :global(.svlt-grid-item) {
    transition: transform 150ms ease;
  }
</style>

<Grid
  let:item
  {...$gridOptions}
  on:adjust={onChange}
  bind:items={panel.grid}
>
  <Widget panel={panel} item={item} />
</Grid>
