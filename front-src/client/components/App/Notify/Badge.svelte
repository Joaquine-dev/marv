<script>
  import { color } from "./colors";

  export let type;
  export let notices;
</script>

{#if notices.length}
  <div class="text-xs px-2 inline rounded {color(type)}">
    {notices.length}
  </div>
{/if}
