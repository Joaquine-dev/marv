<script>
  import Icon from "./Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import Overlay from "@/components/UI/Overlay.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  const dispatch = createEventDispatcher();

  export let title = null;
  export let opened = false;
  export let minWidth = 300;
  export let closeCross = true;
  export let closeOnBlur = true;

  let cls = "";
  export { cls as class };

  function close() {
    opened = false;
    dispatch("close");
  }

  function onClickOut() {
    closeOnBlur && close();
  }
</script>

{#if opened}
  <Overlay on:mousedown on:click={onClickOut}>
    <div
      class="m-auto {cls}"
      on:click|stopPropagation
      style="min-width:{minWidth}px"
    >
      <div class="bg-surface text-text-primary rounded border border-border">
        {#if title}
          <div class="p-3 gap-2 flex items-center border-b border-border">
            <div class="flex-auto font-medium">{title}</div>
            {#if closeCross}
              <Icon
                on:click={close}
                icon={MdClose}
                class="cursor-pointer text-text-secondary hover:text-text-primary transition-colors duration-150"
              />
            {/if}
          </div>
        {/if}
        <slot />
      </div>
    </div>
  </Overlay>
{/if}
