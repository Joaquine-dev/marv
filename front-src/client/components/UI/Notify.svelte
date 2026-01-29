<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "@/components/UI/Icon.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";

  export let message;
  export let delay = 5000;
  export let type = "info";
  export let closable = true;

  const dispatch = createEventDispatcher();

  const colors = {
    info: "border-l-info",
    warn: "border-l-warning",
    error: "border-l-error",
    success: "border-l-success",
  };

  function close() {
    message = null;
    dispatch("close");
  }

  let timeoutId = null;

  $: if (message) {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(close, delay);
  }
</script>

{#if message}
  <div
    in:fade
    out:fade
    class="flex bg-surface text-text-primary border-l-4 {colors[type]} rounded"
  >
    <div class="p-2 flex-auto">{message}</div>
    {#if closable}
      <div
        class="p-2 cursor-pointer text-text-secondary hover:text-text-primary transition-colors duration-150"
        on:click={close}
      >
        <Icon icon={MdClose} />
      </div>
    {/if}
  </div>
{/if}
