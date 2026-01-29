<script>
  import { createEventDispatcher } from "svelte";

  export let label = null;
  export let checked = false;
  export let labelClass = "cursor-pointer";

  const dispatch = createEventDispatcher();

  function toggle() {
    checked = !checked;
    dispatch("change", checked);
  }
</script>

<div
  class="flex items-center gap-3 p-2 cursor-pointer group"
  on:click={toggle}
>
  <div
    class="w-4 h-4 rounded-sm border transition-all duration-150 flex items-center justify-center {checked ? 'bg-accent border-accent' : 'border-border group-hover:border-accent'}"
  >
    {#if checked}
      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    {/if}
  </div>
  {#if label}
    <span class="text-text-primary {labelClass}">{label}</span>
  {/if}
</div>
