<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import Heading from "../components/Heading.svelte";
  import type { Context } from "../contracts/model.type";
  import { CONTEXT_KEY } from "../utils/context-key";

  export let id: string;
  export let isOpen = false;

  let contentHeight: number;
  let headerHeight: number;

  const { sections } = getContext<Context>(CONTEXT_KEY);

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
  class:open={isOpened}
  data-testid="accordion-section-{id}"
>
  <Heading {id} {isOpened} bind:headerHeight>
    <svelte:fragment slot="_header">
      <slot name="header" />
    </svelte:fragment>
    <svelte:fragment slot="_aside">
      <slot name="aside" />
    </svelte:fragment>
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

  .content {
    overflow-y: auto;
    background-color: #242424;
  }
</style>
