<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import Heading from "../components/Heading.svelte";
  import type { Context } from "../contracts/model.type";
  import { CONTEXT_KEY } from "../utils/context-key";

  export let id: string;
  export let isOpen = false;
  export let isLoading = false;

  let contentHeight: number;
  let headerHeight: number;

  const { sections } = getContext<Context>(CONTEXT_KEY);

  const height = writable(0);
  const refHeaderHeight = writable(0);
  const refContentHeight = writable(0);
  const isOpened = writable(isOpen);

  $sections[id] = {
    isOpened,
    refHeaderHeight,
    refContentHeight,
    height,
  };

  onMount(() => {
    $refContentHeight = contentHeight ?? 0;
    return () => {
      $sections[id] = undefined;
    };
  });

  $: {
    const newHeight = headerHeight ?? 0;
    if (newHeight !== $refHeaderHeight) {
      $refHeaderHeight = newHeight;
      $sections[id] = $sections[id];
    }
  }
</script>

<section
  class="accordion-section"
  class:opened={$isOpened}
  data-testid="accordion-section-{id}"
>
  <Heading {id} {isOpened} bind:headerHeight>
    <svelte:fragment slot="_header">
      <slot name="header" />
    </svelte:fragment>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation slot="_aside">
      <slot name="aside" />
    </div>
  </Heading>
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

  .accordion-section :global(.aside) {
    display: none;
    margin-left: auto;
  }

  .accordion-section:hover.opened :global(.aside),
  .accordion-section.opened:focus-within :global(.aside) {
    display: block;
  }

  .content {
    overflow-y: auto;
    background-color: #242424;
  }
</style>
