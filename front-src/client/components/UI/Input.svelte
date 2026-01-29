<script>
  /**
   * Input - Modern Glass Design System
   * Modernized with focus glow, error states, and smooth transitions
   */
  import { debounce } from "throttle-debounce";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";

  // Legacy props (backwards compatibility)
  export let icon = null;
  export let label = null;
  export let type = "text";
  export let rootClass = "";
  export let labelClass = "p-2";
  export let inputClass = "p-2";
  export let labelMinWidth = "50%";
  export let textColor = "text-text-primary";
  export let bgColor = "bg-background-surface";

  // New props
  export let error = false;
  export let errorMessage = "";
  export let placeholder = "";
  export let disabled = false;
  export let rounded = "rounded-lg";

  $: color = `${bgColor} ${textColor}`;
  $: inputHidden = type === "checkbox" ? "hidden" : "";
  $: labelStyle = labelMinWidth ? `min-width:${labelMinWidth}` : "";

  // Border color based on state
  $: borderClass = error
    ? "border-error focus-within:border-error focus-within:ring-2 focus-within:ring-error/30"
    : "border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30";

  $: disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const dispatch = createEventDispatcher();
  const debounceUpdate = debounce(500, update);

  function onKeypress(event) {
    if (event.keyCode == 13) {
      dispatch("enterKey", event);
    }
  }

  function update({ target }) {
    dispatch("update", target.value);
  }

  function onInput(event) {
    debounceUpdate(event);
    dispatch("input", event);
  }
</script>

<div class="input-wrapper {disabledClass}">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label
    class="
      flex flex-wrap items-center {rounded} border
      transition-all duration-200 ease-smooth
      {borderClass} {color} {rootClass}
    "
  >
    {#if label}
      <div style={labelStyle} class="flex font-medium text-text-secondary {labelClass}">
        {#if icon}
          <Icon {icon} class="mr-2" />
        {/if}
        <span>{label}</span>
      </div>
    {/if}
    <div class="flex-auto">
      <input
        {...$$restProps}
        {type}
        {placeholder}
        {disabled}
        on:blur
        on:focus
        on:change
        on:input={onInput}
        on:keypress={onKeypress}
        class="
          {inputClass} w-full bg-transparent
          text-text-primary border-0
          placeholder:text-text-muted
          focus:outline-none
          disabled:cursor-not-allowed
          {inputHidden}
        "
      />
    </div>
  </label>

  <!-- Error message -->
  {#if error && errorMessage}
    <p class="mt-1 text-sm text-error flex items-center gap-1">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {errorMessage}
    </p>
  {/if}
</div>

<style>
  .input-wrapper {
    width: 100%;
  }

  /* Focus ring animation */
  label {
    position: relative;
  }

  /* Smooth placeholder transition */
  input::placeholder {
    transition: opacity 150ms ease;
  }

  input:focus::placeholder {
    opacity: 0.5;
  }

  /* Smooth easing */
  :global(.ease-smooth) {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
