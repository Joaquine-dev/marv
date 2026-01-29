<script>
  import api from "@/api/panels";
  import { _ } from "@/libs/i18next";
  import { saveAs } from "file-saver";
  import { exportPanel } from "@/libs/panels";
  import Button from "./Selector/Button.svelte";
  import MdEdit from "svelte-icons/md/MdEdit.svelte";
  import MenuItem from "@/components/UI/MenuItem.svelte";
  import RenameModal from "./Selector/RenameModal.svelte";
  import RemoveModal from "./Selector/RemoveModal.svelte";
  import Separator from "@/components/UI/Separator.svelte";
  import ContextMenu from "@/components/App/ContextMenu.svelte";
  import FaFileExport from "svelte-icons/fa/FaFileExport.svelte";
  import { panels, currentPanel, setPanels } from "@/stores/panels";
  import MdDeleteForever from "svelte-icons/md/MdDeleteForever.svelte";
  import HorizontalScroller from "@/components/UI/HorizontalScroller.svelte";

  let scroller = null;
  let selectedPanel = null;
  let renameModalOpened = false;
  let removeModalOpened = false;

  api.on("add", (panel, { owner }) => {
    owner && scroller && scroller.scrollRight();
  });

  function onMove({ detail }) {
    const { from, to } = detail;
    if (from === to) return;
    $panels.splice(to, 0, $panels.splice(from, 1)[0]);
    setPanels($panels);
  }

  function openRenameModal(panel) {
    selectedPanel = panel;
    renameModalOpened = true;
  }

  function openRemoveModal(panel) {
    selectedPanel = panel;
    removeModalOpened = true;
  }

  async function onExportPanel(panel) {
    const { filename, buffer } = await exportPanel(panel);
    const blob = new Blob([buffer], { type: "application/zip" });
    saveAs(blob, filename);
  }
</script>

{#if $currentPanel}
  <div class="panel-selector">
    <HorizontalScroller bind:this={scroller} gap="2" arrowClass="selector-arrow">
      {#each $panels as panel, index (panel.id)}
        <ContextMenu let:opened>
          <Button
            class={opened ? 'context-open' : ''}
            index={index}
            panel={panel}
            on:move={onMove}
          />
          <div slot="items">
            <MenuItem
              icon={MdEdit}
              class="capitalize"
              on:click={openRenameModal.bind(null, panel)}
            >
              {_('words.rename')}
            </MenuItem>
            <MenuItem
              class="capitalize"
              icon={MdDeleteForever}
              on:click={openRemoveModal.bind(null, panel)}
            >
              {_('words.remove')}
            </MenuItem>
            <MenuItem
              class="capitalize"
              icon={FaFileExport}
              on:click={onExportPanel.bind(null, panel)}
            >
              {_('words.export')}
            </MenuItem>
            <Separator />
          </div>
        </ContextMenu>
      {/each}
    </HorizontalScroller>
  </div>
{/if}

<RenameModal panel={selectedPanel} bind:opened={renameModalOpened} />
<RemoveModal panel={selectedPanel} bind:opened={removeModalOpened} />

<style>
  .panel-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    background: var(--color-background, #0a0a0b);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
  }

  :global(.selector-arrow) {
    background: var(--color-background, #0a0a0b) !important;
    color: var(--color-text-muted, #71717a);
  }

  :global(.selector-arrow:hover) {
    color: var(--color-text-primary, #fafafa);
  }

  :global(.context-open) {
    border-color: var(--color-accent, #8b5cf6) !important;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
  }
</style>
