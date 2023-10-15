<script lang="ts">
  import Accordion from "./lib/components/Accordion.svelte";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="sample sample1" style:height="550px">
  <Accordion let:Section>
    {#each { length: 6 } as section, i}
      <Section id={String(i)}>
        <div slot="header">header {i}</div>
        <div slot="aside">
          <div>
            <span>🌙</span>
            <span>🚧</span>
          </div>
        </div>
        <div
          style:height={`${i * 60}px`}
          style:padding={`0.5rem`}
          style:background-color="rgb(47 50 89 / 53%)"
        >
          A content of section: {i}
        </div>
      </Section>
    {/each}
  </Accordion>
</div>

<div class="sample sample2">
  <Accordion let:Section>
    {#each { length: 3 } as section, i}
      <Section id={String(i)}>
        <div slot="aside">
          <button on:click={() => alert("hello")}>🚀</button>
        </div>
        <div
          style:height={`${i * 100}px`}
          style:padding={`0.5rem`}
          style:background-color="rgb(21 50 99 / 53%)"
        >
          A content of section: {i}
        </div>
      </Section>
    {/each}
  </Accordion>
</div>

<style>
  :global(body) {
    font-family: "Nunito Sans", sans-serif;
  }

  .sample {
    width: 300px;
    margin: 10px 0;
  }

  .sample1 {
    overflow-y: auto;
    font-size: 12px;
    background-color: #626262;
  }
</style>
