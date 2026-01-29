<script>
  /**
   * OBS Connect Button - Modern Glass Design System
   * Toggle OBS connection with visual feedback
   */
  import obs from "@/api/obs";
  import { state } from "@/stores/obs";
  import Icon from "@/components/UI/Icon.svelte";
  import MdPowerSettingsNew from "svelte-icons/md/MdPowerSettingsNew.svelte";

  function toggle() {
    if ($state.connected || $state.connecting) {
      obs.disconnect();
    } else {
      obs.connect();
    }
  }

  function getButtonState({ connected, connecting }) {
    if (connected) {
      return {
        class: "connected",
        title: "Déconnecter OBS",
      };
    } else if (connecting) {
      return {
        class: "connecting",
        title: "Connexion en cours...",
      };
    } else {
      return {
        class: "disconnected",
        title: "Connecter OBS",
      };
    }
  }

  $: buttonState = getButtonState($state);
</script>

<button
  on:click={toggle}
  class="obs-connect {buttonState.class}"
  title={buttonState.title}
  aria-label={buttonState.title}
>
  <div class="icon-wrapper">
    <Icon icon={MdPowerSettingsNew} size="20px" />
  </div>
</button>

<style>
  .obs-connect {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .icon-wrapper {
    display: flex;
    transition: all 150ms ease;
  }

  /* Disconnected state */
  .obs-connect.disconnected {
    color: var(--color-text-muted, #71717a);
  }

  .obs-connect.disconnected:hover {
    color: var(--color-success, #10b981);
    background: rgba(16, 185, 129, 0.1);
  }

  /* Connected state */
  .obs-connect.connected {
    color: var(--color-success, #10b981);
  }

  .obs-connect.connected:hover {
    color: var(--color-error, #f43f5e);
    background: rgba(244, 63, 94, 0.1);
  }

  /* Connecting state */
  .obs-connect.connecting {
    color: var(--color-warning, #f59e0b);
  }

  .obs-connect.connecting .icon-wrapper {
    animation: spin 1s linear infinite;
  }

  .obs-connect.connecting:hover {
    color: var(--color-error, #f43f5e);
    background: rgba(244, 63, 94, 0.1);
  }

  /* Focus state */
  .obs-connect:focus-visible {
    outline: 2px solid var(--color-accent, #8b5cf6);
    outline-offset: 2px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
