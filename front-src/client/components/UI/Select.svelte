<script>
  import { createEventDispatcher } from "svelte";

  export let items = [];
  export let value = null;
  export let label = null;
  export let object = false;
  export let rootClass = "";
  export let inputClass = "p-2";
  export let labelMinWidth = "50%";
  export let textColor = "text-text-primary";
  export let bgColor = "bg-surface";
  export let labelClass = "p-2 font-medium text-text-secondary";

  $: color = `${bgColor} ${textColor}`;
  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<style>
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1rem;
    padding-right: 2rem;
    appearance: none;
  }
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="{rootClass} flex flex-auto items-center rounded border border-border {color}">
  {#if label}
    <div style={labelStyle} class={labelClass}>{label}</div>
  {/if}
  <div class="flex-auto">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      {...$$restProps}
      class="{inputClass} w-full bg-transparent text-text-primary cursor-pointer"
      on:change={change}
      bind:value
    >
      {#each items as item}
        {#if object}
          <option value={item.val} disabled={item.val === value}>
            {item.key}
          </option>
        {:else}
          <option value={item} disabled={item === value}>{item}</option>
        {/if}
      {/each}
    </select>
  </div>
</label>
