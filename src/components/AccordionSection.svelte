<script lang="ts">
  import { getContext, onMount, tick } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import Chevron from "@/components/Chevron.svelte";
  import type { Context } from "@/lib/model.type";
  import sectionOpenEvent from "@/lib/section-open.event";

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
    $refHeaderHeight = headerHeight;
    return () => {
      $sections[id] = undefined;
    };
  });

  async function handleHeadingClick() {
    sectionOpenEvent.publish({ id });
    $isOpened = !$isOpened;
    await tick();
    $refContentHeight = contentHeight;
    $sections[id] = $sections[id];
  }

  $: {
    $refHeaderHeight = headerHeight;
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
  {#if $isOpened}
    <div
      transition:slide={{ duration: 200 }}
      class="content"
      style:height="{$height}px"
    >
      <div style="overflow:none" bind:clientHeight={contentHeight}>
        <slot />
      </div>
    </div>
  {/if}
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
    overflow-y: scroll;
    background-color: #242424;
  }
</style>
