<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import Heading from "../components/Heading.svelte";
  import type { Context } from "../contracts/model.type";
  import { CONTEXT_KEY } from "../utils/context-key";

  export let id: string;
  export let isLoading = false;

  let contentHeight: number;
  let headerHeight: number;

  const { sections } = getContext<Context>(CONTEXT_KEY);

  const height = writable(0);
  const refHeaderHeight = writable(0);
  const refContentHeight = writable(0);
  const isOpened = writable(false);

  $sections[id] = {
    isOpened,
    refHeaderHeight,
    refContentHeight,
    height,
  };

  onMount(() => {
    $refContentHeight = contentHeight ?? 0;
    return () => {
      delete $sections[id];
    };
  });

  $: sectionState = {
    isOpen: $isOpened,
    height: $height,
    contentHeight: $refContentHeight,
  };
  $: {
    const newHeight = headerHeight ?? 0;
    if (newHeight !== $refHeaderHeight) {
      $refHeaderHeight = newHeight;
      $sections[id] = $sections[id];
    }
  }
  $: {
    const newContentHeight = contentHeight ?? 0;
    if (newContentHeight !== $refContentHeight) {
      $refContentHeight = newContentHeight;
      $sections[id] = $sections[id];
    }
  }
</script>

<section
  class="accordion-section"
  class:opened={$isOpened}
  data-testid="accordion-section-{id}"
>
  <Heading {id} {isOpened} {isLoading} bind:headerHeight>
    <svelte:fragment slot="_header">
      <slot {sectionState} name="header" />
    </svelte:fragment>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="aside"
      on:click|stopPropagation
      on:keydown|stopPropagation
      slot="_aside"
    >
      <slot {sectionState} name="aside" />
    </div>
  </Heading>
  {#key $isOpened}
    <div
      transition:slide={{ duration: 200 }}
      class="content"
      style:height="{$height}px"
    >
      <div style="overflow:none" bind:offsetHeight={contentHeight}>
        <slot {sectionState} />
      </div>
    </div>
  {/key}
</section>

<style>
  :root {
    --section-background: #4a4a4a;
  }

  .accordion-section {
    background-color: var(--section-background);
  }

  .accordion-section .aside {
    display: none;
    margin-left: auto;
  }

  .accordion-section:hover.opened .aside,
  .accordion-section.opened:focus-within .aside {
    display: block;
  }

  .content {
    overflow-y: auto;
  }
</style>
