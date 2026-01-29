<script>
  import ms from "ms";
  import NoticeIcon from "./Icon.svelte";
  import { slide } from "svelte/transition";
  import { closeNotice } from "@/stores/notify";
  import Icon from "@/components/UI/Icon.svelte";
  import MdCheck from "svelte-icons/md/MdCheck.svelte";

  export let notice;
  export let time = Date.now();
</script>

<div
  transition:slide|local
  on:mouseenter={() => closeNotice(notice)}
  class="flex p-3 gap-3 items-center text-light bg-surface border border-border rounded transition-opacity duration-150 {notice.read ? 'opacity-60' : ''}"
>
  <NoticeIcon type={notice.type} />
  <div class="flex-auto break-all">{notice.message}</div>
  {#if notice.read}
    <div class="text-success">
      <Icon icon={MdCheck} />
    </div>
  {/if}
  <div class="text-light-darker text-sm">{ms(time - notice.time)}</div>
</div>
