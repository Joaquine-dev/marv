<script>
  import { toggle } from "@/stores/drawer";
  import MdMenu from "svelte-icons/md/MdMenu.svelte";
  import Icon from "@/components/UI/Icon.svelte";
</script>

<div
  on:click|stopPropagation={toggle}
  class="p-2 text-light-darker hover:text-light hover:bg-accent-muted cursor-pointer transition-colors duration-150"
>
  <Icon icon={MdMenu} />
</div>
