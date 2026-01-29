<script>
  /**
   * Toast - Individual notification
   * Part of MARV Modern Glass Design System
   */

  import { createEventDispatcher } from "svelte";
  import { slideUp } from "../../libs/transitions";

  export let id;
  export let type = "info"; // success | error | warning | info
  export let message = "";
  export let action = null; // { label: string, onClick: function }

  const dispatch = createEventDispatcher();

  // Type-based styling
  const typeStyles = {
    success: {
      bg: "bg-success/10",
      border: "border-success/50",
      icon: "text-success",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    error: {
      bg: "bg-error/10",
      border: "border-error/50",
      icon: "text-error",
      iconPath: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/50",
      icon: "text-warning",
      iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
    info: {
      bg: "bg-info/10",
      border: "border-info/50",
      icon: "text-info",
      iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  };

  $: style = typeStyles[type] || typeStyles.info;

  function handleDismiss() {
    dispatch("dismiss", { id });
  }

  function handleAction() {
    if (action?.onClick) {
      action.onClick();
    }
    handleDismiss();
  }
</script>

<div
  class="toast {style.bg} {style.border}"
  in:slideUp={{ duration: 200 }}
  out:slideUp={{ duration: 150 }}
>
  <!-- Icon -->
  <div class="toast-icon {style.icon}">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={style.iconPath} />
    </svg>
  </div>

  <!-- Message -->
  <div class="toast-message">
    {message}
  </div>

  <!-- Action button (optional) -->
  {#if action}
    <button class="toast-action" on:click={handleAction}>
      {action.label}
    </button>
  {/if}

  <!-- Dismiss button -->
  <button class="toast-dismiss" on:click={handleDismiss}>
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>

<style>
  .toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid;
    background: rgba(20, 20, 22, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.5);
    min-width: 300px;
    max-width: 450px;
  }

  .toast-icon {
    flex-shrink: 0;
  }

  .toast-message {
    flex: 1;
    font-size: 14px;
    color: #fafafa;
    line-height: 1.4;
  }

  .toast-action {
    flex-shrink: 0;
    padding: 0.25rem 0.75rem;
    font-size: 13px;
    font-weight: 500;
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: 6px;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .toast-action:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.5);
  }

  .toast-dismiss {
    flex-shrink: 0;
    padding: 0.25rem;
    color: #71717a;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .toast-dismiss:hover {
    color: #fafafa;
    background: rgba(255, 255, 255, 0.1);
  }
</style>
