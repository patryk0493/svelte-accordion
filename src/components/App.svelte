<script lang="ts">
  import Accordion from "@/components/Accordion.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="sample1">
  <Accordion let:Section>
    {#each { length: 6 } as section, i}
      <Section id={String(i)}>
        <div style:height={`${i * 50}px`}>
          Content of {i}
        </div>
      </Section>
    {/each}
  </Accordion>
</div>

<style>
  :global(body) {
    font-family: "Nunito Sans", sans-serif;
  }

  .sample1 {
    height: 550px;
    overflow: hidden;
    font-size: 12px;
    background-color: #626262;
  }
</style>
