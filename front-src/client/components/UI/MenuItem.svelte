<script>
  import Icon from "@/components/UI/Icon.svelte";

  export let icon = null;

  let cls = "";

  export { cls as class };
</script>

<div
  on:click
  class="flex gap-2 p-2 rounded font-medium text-text-primary hover:bg-accent-muted hover:text-accent cursor-pointer transition-colors duration-150"
>
  {#if icon}
    <div>
      <Icon icon={icon} />
    </div>
  {/if}
  <div class={cls}>
    <slot />
  </div>
</div>
