<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let enabled = false;

  function onClick() {
    enabled = !enabled;
    dispatch("change", enabled);
  }
</script>

<div
  on:click={onClick}
  class="relative w-8 h-4 flex items-center cursor-pointer"
>
  <div
    class="w-8 h-2 rounded-full transition-colors duration-150 {enabled ? 'bg-accent' : 'bg-border'}"
  ></div>
  <div
    class="absolute top-0 w-4 h-4 rounded-full transition-all duration-150 {enabled ? 'right-0 bg-accent' : 'left-0 bg-text-secondary'}"
  ></div>
</div>
