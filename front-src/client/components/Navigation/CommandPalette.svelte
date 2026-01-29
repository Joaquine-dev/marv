<script>
  /**
   * CommandPalette - Modern Glass Design System
   * Quick search and navigation (Ctrl+K / Cmd+K)
   */
  import { createEventDispatcher, onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { panels, currentPanel } from "@/stores/panels";

  export let open = false;

  const dispatch = createEventDispatcher();

  let searchInput;
  let query = "";
  let selectedIndex = 0;
  let results = [];

  // Categories for search
  const categories = {
    panels: { label: "Panels", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
    actions: { label: "Actions", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  };

  // Build searchable items
  $: items = [
    // Panels
    ...$panels.map((panel, index) => ({
      id: `panel-${panel.id}`,
      type: "panels",
      label: panel.name || `Panel ${index + 1}`,
      shortcut: index < 9 ? `${index + 1}` : null,
      action: () => {
        currentPanel.set(panel.id);
        close();
      },
    })),
    // Actions
    {
      id: "action-new-panel",
      type: "actions",
      label: "Créer un nouveau panel",
      shortcut: "Ctrl+N",
      action: () => {
        dispatch("action", { type: "new-panel" });
        close();
      },
    },
  ];

  // Filter results based on query
  $: {
    if (query.trim()) {
      const q = query.toLowerCase();
      results = items.filter((item) =>
        item.label.toLowerCase().includes(q)
      );
    } else {
      results = items;
    }
    selectedIndex = 0;
  }

  function close() {
    open = false;
    query = "";
    dispatch("close");
  }

  function handleKeydown(event) {
    if (!open) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, results.length - 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        break;
      case "Enter":
        event.preventDefault();
        if (results[selectedIndex]) {
          results[selectedIndex].action();
        }
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
    }
  }

  function selectItem(item) {
    item.action();
  }

  // Global keyboard shortcut
  function handleGlobalKeydown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      open = !open;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => window.removeEventListener("keydown", handleGlobalKeydown);
  });

  // Focus input when opened
  $: if (open && searchInput) {
    setTimeout(() => searchInput.focus(), 50);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <div class="palette-backdrop" on:click={close} on:keydown />

  <!-- Palette -->
  <div
    class="palette-container"
    transition:scale={{ duration: 150, start: 0.95, easing: quintOut }}
    role="dialog"
    aria-modal="true"
    aria-label="Recherche rapide"
  >
    <div class="palette-content">
      <!-- Search input -->
      <div class="palette-search">
        <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          bind:this={searchInput}
          bind:value={query}
          type="text"
          placeholder="Rechercher panels, actions..."
          class="search-input"
        />
        <kbd class="search-kbd">Esc</kbd>
      </div>

      <!-- Results -->
      <div class="palette-results">
        {#if results.length === 0}
          <div class="palette-empty">
            Aucun résultat pour "{query}"
          </div>
        {:else}
          {#each Object.entries(categories) as [type, category]}
            {@const typeResults = results.filter((r) => r.type === type)}
            {#if typeResults.length > 0}
              <div class="palette-group">
                <div class="palette-group-label">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={category.icon} />
                  </svg>
                  {category.label}
                </div>
                {#each typeResults as item, i}
                  {@const globalIndex = results.indexOf(item)}
                  <button
                    class="palette-item"
                    class:selected={globalIndex === selectedIndex}
                    on:click={() => selectItem(item)}
                    on:mouseenter={() => (selectedIndex = globalIndex)}
                  >
                    <span class="item-label">{item.label}</span>
                    {#if item.shortcut}
                      <kbd class="item-shortcut">{item.shortcut}</kbd>
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .palette-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(10, 10, 11, 0.7);
    backdrop-filter: blur(4px);
    z-index: 100;
  }

  .palette-container {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 560px;
    z-index: 101;
  }

  .palette-content {
    background: rgba(20, 20, 22, 0.98);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .palette-search {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  .search-icon {
    width: 20px;
    height: 20px;
    color: var(--color-text-muted, #71717a);
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    font-size: 16px;
    color: var(--color-text-primary, #fafafa);
    outline: none;
  }

  .search-input::placeholder {
    color: var(--color-text-muted, #71717a);
  }

  .search-kbd,
  .item-shortcut {
    padding: 0.25rem 0.5rem;
    font-size: 11px;
    font-family: ui-monospace, monospace;
    color: var(--color-text-muted, #71717a);
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 4px;
  }

  .palette-results {
    max-height: 400px;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .palette-empty {
    padding: 2rem 1rem;
    text-align: center;
    color: var(--color-text-muted, #71717a);
  }

  .palette-group {
    margin-bottom: 0.5rem;
  }

  .palette-group-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted, #71717a);
  }

  .palette-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    background: transparent;
    border: none;
    color: var(--color-text-primary, #fafafa);
    cursor: pointer;
    transition: all 100ms ease;
    text-align: left;
  }

  .palette-item:hover,
  .palette-item.selected {
    background: var(--color-accent-muted, rgba(139, 92, 246, 0.1));
  }

  .palette-item.selected {
    outline: 1px solid var(--color-accent, #8b5cf6);
  }

  .item-label {
    font-size: 14px;
  }
</style>
