<script lang="ts">
  import Accordion from "../lib";
</script>

<Accordion let:Section>
  {#each { length: 3 } as section, i}
    <Section id={String(i)}>
      <button slot="aside" on:click={() => alert("hello")}>🚀</button>
      <div
        style:height={`${(i + 1) * 50}px`}
        style:padding={`0.5rem`}
        style:background-color="rgb(21 50 99 / 53%)"
      >
        A content of section: {i}
      </div>
    </Section>
  {/each}
</Accordion>
