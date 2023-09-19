<script lang="ts">
  import Accordion from "@/components/Accordion.svelte";
  import AccordionSection from "@/components/AccordionSection.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="sample1">
  <Accordion>
    {#each { length: 5 } as section, i}
      <AccordionSection id={String(i)}>
        Content of {i}
      </AccordionSection>
    {/each}
  </Accordion>
</div>

<style>
  :global(body) {
    font-family: "Nunito Sans", sans-serif;
  }

  .sample1 {
    height: 350px;
    font-size: 12px;
    background-color: #626262;
  }
</style>
