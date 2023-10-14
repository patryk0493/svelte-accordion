<script lang="ts">
  import { getContext, tick } from "svelte";
  import type { Writable } from "svelte/store";
  import Chevron from "../components/Chevron.svelte";
  import type { Context } from "../contracts/model.type";
  import sectionToggleEvent from "../events/section-toggle.event";
  import { CONTEXT_KEY } from "../utils/context-key";

  export let id: string;
  export let isOpened: Writable<boolean>;
  export let headerHeight: number;

  const { sections } = getContext<Context>(CONTEXT_KEY);

  async function handleHeadingClick() {
    sectionToggleEvent.publish({ id });
    $isOpened = !$isOpened;
    await tick();
    $sections[id] = $sections[id];
  }
</script>

<div
  class="heading"
  on:click={handleHeadingClick}
  on:keydown={handleHeadingClick}
  bind:offsetHeight={headerHeight}
  data-testid="heading-{id}"
  aria-hidden="true"
>
  <Chevron rotated={$isOpened} />
  <slot name="_header" />
  <aside><slot name="_aside" /></aside>
</div>

<style>
  .heading {
    display: flex;
    padding: 4px;
    gap: 8px;
    cursor: pointer;
  }

  .heading aside {
    display: none;
    margin-left: auto;
  }

  .heading:hover aside {
    display: block;
  }
</style>
