<script lang="ts">
  import Chevron from "@/components/Chevron.svelte";
  import { onMount } from "svelte";

  export let id: string;

  let isOpened: boolean;

  let ref: HTMLDivElement | undefined;
  let height: number;

  onMount(() => {
    console.log(ref, id);
  });

  function handleHeadingClick() {
    isOpened = !isOpened;
  }

  $: forcedHeight = isOpened ? height : 0;
</script>

<section class="accordion-section">
  <div
    class="heading"
    on:click={handleHeadingClick}
    on:keydown={handleHeadingClick}
    aria-hidden="true"
  >
    <Chevron rotated={isOpened} />
    Section: {id} h: {height}
  </div>
  <!-- <div class="content" style:height="{forcedHeight}px"> -->
  <div class="content" style:height="{forcedHeight}px">
    <div style="overflow:none" bind:clientHeight={height}>
      <slot />
    </div>
  </div>
</section>

<style>
  .accordion-section {
    padding: 1px;
    border: 2px solid rgb(21, 166, 106);
    background-color: #4a4a4a;
  }

  .heading {
    display: flex;
    gap: 8px;
    cursor: pointer;
  }

  .content {
    overflow-y: scroll;
    background-color: #242424;
  }
</style>
