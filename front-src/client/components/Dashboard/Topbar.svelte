<script>
  /**
   * Topbar - Modern Glass Design System
   * Top navigation bar with status indicators and glass effect
   */
  import { _ } from "@/libs/i18next";
  import { editMode } from "@/stores/panels";
  import DrawerToggle from "./DrawerToggle.svelte";
  import Flexbar from "@/components/UI/Flexbar.svelte";
  import OBSStatus from "@/components/OBS/Status.svelte";
  import OBSConnect from "@/components/OBS/Connect.svelte";
  import TwitchLogin from "@/components/Twitch/Login.svelte";
  import Notices from "@/components/App/Notify/Notices.svelte";
  import FlexbarSpacer from "@/components/UI/Flexbar/Spacer.svelte";
  import StreamStatus from "@/components/Twitch/StreamStatus.svelte";

  $: bgColor = $editMode ? "bg-accent" : "bg-background-surface/80";
  $: editModeClass = $editMode ? "edit-mode-active" : "";
</script>

<div class="topbar h-14 {editModeClass}">
  <Flexbar bgColor={bgColor} class="topbar-inner backdrop-blur-md border-b border-border">
    {#if $editMode}
      <div class="edit-mode-banner">
        <div class="edit-mode-icon">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <span class="font-medium">{_('sentences.edit-mode')}</span>
      </div>
    {:else}
      <!-- Left section: Connection status -->
      <div class="flex items-center gap-1">
        <OBSConnect />
        <OBSStatus />
        <StreamStatus />
      </div>
      <FlexbarSpacer />
    {/if}

    <!-- Right section: Notifications & Settings -->
    <div class="flex items-center gap-1">
      <Notices />
      <TwitchLogin />
      <DrawerToggle />
    </div>
  </Flexbar>
</div>

<style>
  .topbar {
    position: relative;
    z-index: 40;
  }

  .topbar :global(.topbar-inner) {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Edit mode styling */
  .edit-mode-active {
    animation: edit-pulse 2s ease-in-out infinite;
  }

  .edit-mode-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    color: white;
    flex: 1;
    justify-content: center;
  }

  .edit-mode-icon {
    animation: edit-bounce 1s ease-in-out infinite;
  }

  @keyframes edit-pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
    }
    50% {
      box-shadow: 0 0 20px 0 rgba(139, 92, 246, 0.3);
    }
  }

  @keyframes edit-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-2px);
    }
  }
</style>
