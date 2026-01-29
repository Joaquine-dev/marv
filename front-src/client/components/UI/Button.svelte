<script>
  import Icon from "./Icon.svelte";

  export let cls = "";
  export { cls as class };

  export let dark = true;
  export let icon = null;
  export let iconSize = null;
  export let iconColor = null;
  export let textColor = null;
  export let padding = "p-2";
  export let disabled = false;
  export let variant = "default"; // default, accent, success, error

  const variants = {
    default: "border-border hover:border-accent hover:bg-accent-muted",
    accent: "border-accent bg-accent-muted hover:bg-accent hover:text-white",
    success: "border-success bg-success-muted hover:bg-success hover:text-white",
    error: "border-error bg-error-muted hover:bg-error hover:text-white",
  };

  $: variantClass = variants[variant] || variants.default;
  $: colorClass = textColor || "text-text-primary";
  $: disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
</script>

<button
  disabled={disabled}
  class="flex items-center justify-center gap-2 {padding} font-medium border rounded transition-all duration-150 {variantClass} {colorClass} {disabledClass} {cls}"
  {...$$restProps}
  on:click
>
  {#if icon}
    <Icon icon={icon} size={iconSize} color={iconColor} />
  {/if}
  <slot />
</button>
