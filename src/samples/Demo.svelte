<script lang="ts">
  import Accordion from "../lib";
</script>

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
