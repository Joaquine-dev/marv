<script>
  /**
   * Select - Modern Glass Design System
   * Modernized with focus glow and smooth transitions
   */
  import { createEventDispatcher } from "svelte";

  // Legacy props (backwards compatibility)
  export let items = [];
  export let value = null;
  export let label = null;
  export let object = false;
  export let rootClass = "";
  export let inputClass = "p-2";
  export let labelMinWidth = "50%";
  export let textColor = "text-text-primary";
  export let bgColor = "bg-background-surface";
  export let labelClass = "p-2 font-medium text-text-secondary";

  // New props
  export let disabled = false;
  export let rounded = "rounded-lg";

  $: color = `${bgColor} ${textColor}`;
  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";
  $: disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const dispatch = createEventDispatcher();

  function change({ target }) {
    dispatch("change", target.value);
  }
</script>

<style>
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238b5cf6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1rem;
    padding-right: 2rem;
    appearance: none;
  }

  select:focus {
    outline: none;
  }

  select option {
    background-color: #141416;
    color: #fafafa;
    padding: 0.5rem;
  }

  select option:hover,
  select option:focus {
    background-color: #1c1c1f;
  }

  /* Smooth easing */
  :global(.ease-smooth) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
  class="
    {rootClass} flex flex-auto items-center {rounded} border border-border
    transition-all duration-200 ease-smooth
    focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30
    {color} {disabledClass}
  "
>
  {#if label}
    <div style={labelStyle} class={labelClass}>{label}</div>
  {/if}
  <div class="flex-auto">
    <!-- svelte-ignore a11y-no-onchange -->
    <select
      {...$$restProps}
      {disabled}
      class="{inputClass} w-full bg-transparent text-text-primary cursor-pointer disabled:cursor-not-allowed"
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
