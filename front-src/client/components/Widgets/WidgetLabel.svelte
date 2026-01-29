<script>
  /**
   * WidgetLabel - Modern Glass Design System
   * Widget title/label with customizable position and styling
   */
  import { _ } from "@/libs/i18next";

  export let widget;

  $: component = widget.component;
  $: componentLabel = component && _(component.label);
  $: label = (widget.label || componentLabel || "").trim();
  $: labelSize = `font-size:${widget.labelSize || 13}px;`;
  $: labelAlign = `text-align:${widget.labelAlign || "center"};`;
  $: padding = widget.labelPadding || 10;
  $: labelPadding = `padding-left:${padding}px;padding-right:${padding}px;`;
  $: isBottom = widget.labelPosition === "bottom";
</script>

{#if label.length}
  <div
    class="widget-label"
    class:bottom={isBottom}
    style="{labelSize} {labelAlign} {labelPadding}"
  >
    <span class="label-text">{label}</span>
  </div>
{/if}

<style>
  .widget-label {
    flex-shrink: 0;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    overflow: hidden;
    word-break: break-word;
    color: var(--color-text-secondary, #a1a1aa);
    border-bottom: 1px solid var(--color-border, #2a2a2d);
    background: rgba(0, 0, 0, 0.2);
  }

  .widget-label.bottom {
    order: 999;
    border-bottom: none;
    border-top: 1px solid var(--color-border, #2a2a2d);
  }

  .label-text {
    user-select: none;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
</style>
