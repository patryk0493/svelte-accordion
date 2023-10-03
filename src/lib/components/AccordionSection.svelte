<script lang="ts">
  import { getContext, onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import Chevron from "../components/Chevron.svelte";
  import type { Context } from "../contracts/model.type";
  import sectionToggleEvent from "../events/section-toggle.event";

  export let id: string;
  export let isOpen = false;

  let contentHeight: number;
  let headerHeight: number;

  const { sections } = getContext<Context>("model");

  const height = writable(0);
  const refHeaderHeight = writable(0);
  const refContentHeight = writable(0);
  const isOpened = writable(isOpen);

  $sections[id] = {
    isOpened: isOpened,
    refHeaderHeight: refHeaderHeight,
    refContentHeight: refContentHeight,
    height: height,
  };

  onMount(() => {
    $refContentHeight = contentHeight ?? 0;
    return () => {
      $sections[id] = undefined;
    };
  });

  async function handleHeadingClick() {
    sectionToggleEvent.publish({ id });
    $isOpened = !$isOpened;
    await tick();
    $sections[id] = $sections[id];
  }

  $: {
    const newHeight = headerHeight ?? 0;
    if (newHeight !== $refHeaderHeight) {
      $refHeaderHeight = newHeight;
      $sections[id] = $sections[id];
    }
  }
</script>

<section class="accordion-section">
  <div
    class="heading"
    on:click={handleHeadingClick}
    on:keydown={handleHeadingClick}
    bind:offsetHeight={headerHeight}
    aria-hidden="true"
  >
    <Chevron rotated={$isOpened} />
    Section: {id}, content: {$refContentHeight}px, header: {$refHeaderHeight}px,
    height: {$height}px
  </div>
  {#key $isOpened}
    <div
      transition:slide={{ duration: 200 }}
      class="content"
      style:height="{$height}px"
    >
      <div style="overflow:none" bind:offsetHeight={contentHeight}>
        <slot />
      </div>
    </div>
  {/key}
</section>

<style>
  .accordion-section {
    background-color: #4a4a4a;
  }

  .heading {
    display: flex;
    padding: 4px;
    gap: 8px;
    cursor: pointer;
  }

  .content {
    overflow-y: auto;
    background-color: #242424;
  }
</style>
