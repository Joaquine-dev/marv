<script>
  /**
   * Drawer - Modern Glass Design System
   * Settings drawer with glass effect and smooth animations
   */
  import { electron } from "@/stores/app";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Donate from "../App/Donate.svelte";
  import QuitButton from "./QuitButton.svelte";
  import { drawer, hide } from "@/stores/drawer";
  import clickoutside from "@/libs/svelte/click-outside";
  import HelpLinks from "@/components/App/HelpLinks.svelte";
  import OBSSettings from "@/components/OBS/SettingsModal.svelte";
  import OpenOnStartup from "@/components/App/OpenOnStartup.svelte";
  import LanguageSelect from "@/components/App/LanguageSelect.svelte";
  import OBSConnectAtStartup from "@/components/OBS/ConnectAtStartup.svelte";
  import CheckUpdateCheckbox from "@/components/App/CheckUpdateCheckbox.svelte";
  import TwitchConnectAtStartup from "@/components/Twitch/ConnectAtStartup.svelte";

  let top = electron ? 29 : 0;
</script>

{#if $drawer.visible}
  <!-- Backdrop -->
  <div
    class="drawer-backdrop"
    style="top:{top}px"
    on:click={hide}
    on:keydown={(e) => e.key === 'Escape' && hide()}
    transition:slide={{ duration: 200, easing: quintOut }}
  />

  <!-- Drawer panel -->
  <div
    use:clickoutside
    on:clickoutside={hide}
    style="top:{top}px"
    class="drawer-panel"
    transition:slide={{ duration: 250, easing: quintOut, axis: 'x' }}
    role="dialog"
    aria-modal="true"
    aria-label="Paramètres"
  >
    <div class="drawer-content">
      <!-- Header -->
      <div class="drawer-header">
        <h2 class="text-lg font-semibold text-text-primary">Paramètres</h2>
        <button
          on:click={hide}
          class="drawer-close"
          aria-label="Fermer"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="drawer-body">
        <QuitButton />
        <LanguageSelect />
        <OBSSettings />

        <div class="drawer-section">
          <h3 class="drawer-section-title">Démarrage</h3>
          <div class="drawer-section-content">
            <OpenOnStartup />
            <OBSConnectAtStartup />
            <TwitchConnectAtStartup />
            <CheckUpdateCheckbox />
          </div>
        </div>

        <HelpLinks />
      </div>

      <!-- Footer -->
      <div class="drawer-footer">
        <Donate />
      </div>
    </div>
  </div>
{/if}

<style>
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 11, 0.5);
    backdrop-filter: blur(4px);
    z-index: 45;
  }

  .drawer-panel {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 320px;
    max-width: 100vw;
    z-index: 50;
    display: flex;
    flex-direction: column;
  }

  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: rgba(20, 20, 22, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-left: 1px solid var(--color-border, #2a2a2d);
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border, #2a2a2d);
    flex-shrink: 0;
  }

  .drawer-close {
    padding: 0.5rem;
    border-radius: 8px;
    color: var(--color-text-muted, #71717a);
    transition: all 150ms ease;
  }

  .drawer-close:hover {
    color: var(--color-text-primary, #fafafa);
    background: var(--color-surface-hover, #222225);
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem 0;
  }

  .drawer-section {
    padding: 0.5rem 0;
  }

  .drawer-section-title {
    padding: 0.5rem 1rem;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted, #71717a);
  }

  .drawer-section-content {
    display: flex;
    flex-direction: column;
  }

  .drawer-section-content > :global(*) {
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .drawer-section-content > :global(*:last-child) {
    border-bottom: none;
  }

  .drawer-footer {
    flex-shrink: 0;
    border-top: 1px solid var(--color-border, #2a2a2d);
  }
</style>
