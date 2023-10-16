<script lang="ts">
  import { getContext, tick } from "svelte";
  import type { Writable } from "svelte/store";
  import Chevron from "../components/Chevron.svelte";
  import Loader from "../components/Loader.svelte";
  import type { Context } from "../contracts/model.type";
  import sectionToggleEvent from "../events/section-toggle.event";
  import { CONTEXT_KEY } from "../utils/context-key";

  export let id: string;
  export let isLoading: boolean;
  export let isOpened: Writable<boolean>;
  export let headerHeight: number;

  const { sections } = getContext<Context>(CONTEXT_KEY);

  async function toggle(node: HTMLElement) {
    sectionToggleEvent.publish(node, { id });
    $isOpened = !$isOpened;
    await tick();
    $sections[id] = $sections[id];
  }

  async function handleClick(e: {
    currentTarget: EventTarget & HTMLDivElement;
  }) {
    await toggle(e.currentTarget);
  }

  async function handleKeyDown(
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    },
  ) {
    if (e.key !== "Enter" && e.key !== " ") return;
    await toggle(e.currentTarget);
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
  class="heading"
  on:click={handleClick}
  on:keydown={handleKeyDown}
  bind:offsetHeight={headerHeight}
  data-testid="heading-{id}"
  aria-hidden="true"
  tabindex="0"
>
  {#if isLoading}
    <Loader />
  {/if}
  <Chevron rotated={$isOpened} />
  <slot name="_header" />
  <div class="aside"><slot name="_aside" /></div>
</div>

<style>
  :root {
    --offset: 2px;
    --outline-color: #2a6489;
    --padding: 4px;
    --gap: 8px;
  }

  .heading {
    display: flex;
    padding: var(--padding);
    gap: var(--gap);
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .heading:focus {
    outline: var(--offset) solid var(--outline-color);
    outline-offset: calc(var(--offset) * -1);
  }
</style>
