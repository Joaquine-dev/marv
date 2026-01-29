<script>
  /**
   * HorizontalScroller - Modern Glass Design System
   * Horizontally scrollable container with arrow navigation
   */
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { throttle } from "throttle-debounce";
  import anime from "animejs";
  import Icon from "./Icon.svelte";
  import MdKeyboardArrowLeft from "svelte-icons/md/MdKeyboardArrowLeft.svelte";
  import MdKeyboardArrowRight from "svelte-icons/md/MdKeyboardArrowRight.svelte";

  export let gap = 1;
  export let arrowClass = "";

  let element = null;
  let overflowing = false;

  const isOverflowing = () => {
    overflowing = element && element.clientWidth < element.scrollWidth;
  };

  export const scrollTo = (scrollLeft) => {
    anime({
      scrollLeft,
      duration: 300,
      targets: element,
      easing: "easeOutCubic",
    });
  };

  const scroll = (n) => {
    scrollTo(element.scrollLeft + n * element.clientWidth * 0.8);
  };

  const throttleScroll = throttle(300, scroll);

  export const scrollLeft = () => {
    scrollTo(0);
  };

  export const scrollRight = () => {
    scrollTo(element.scrollWidth);
  };

  function onWheel(event) {
    event.stopPropagation();
    throttleScroll(event.deltaY / 100);
  }

  function handleResize() {
    isOverflowing();
  }

  onMount(() => {
    element.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", handleResize);
  });

  onDestroy(() => {
    window.removeEventListener("resize", handleResize);
  });

  afterUpdate(isOverflowing);
</script>

<div class="scroller-container">
  {#if overflowing}
    <button
      type="button"
      class="scroll-arrow left {arrowClass}"
      on:click={() => scroll(-1)}
      aria-label="Scroll left"
    >
      <Icon icon={MdKeyboardArrowLeft} size="18px" />
    </button>
  {/if}

  <div
    bind:this={element}
    class="scroll-content"
    style="gap: {gap * 0.25}rem;"
  >
    <slot />
  </div>

  {#if overflowing}
    <button
      type="button"
      class="scroll-arrow right {arrowClass}"
      on:click={() => scroll(1)}
      aria-label="Scroll right"
    >
      <Icon icon={MdKeyboardArrowRight} size="18px" />
    </button>
  {/if}
</div>

<style>
  .scroller-container {
    display: inline-flex;
    align-items: center;
    overflow: hidden;
  }

  .scroll-content {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .scroll-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: var(--color-surface, #141416);
    border: 1px solid var(--color-border, #2a2a2d);
    border-radius: 6px;
    color: var(--color-text-muted, #71717a);
    cursor: pointer;
    transition: all 150ms ease;
    flex-shrink: 0;
  }

  .scroll-arrow:hover {
    color: var(--color-text-primary, #fafafa);
    border-color: var(--color-border-hover, #3f3f46);
  }

  .scroll-arrow:active {
    transform: scale(0.95);
  }

  .scroll-arrow.left {
    margin-right: 0.5rem;
  }

  .scroll-arrow.right {
    margin-left: 0.5rem;
  }
</style>
