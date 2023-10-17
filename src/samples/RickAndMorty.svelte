<script lang="ts">
  import Accordion from "../lib";

  type GetCharacters = () => Promise<{
    results: Array<{
      name: string;
      image: string;
      id: string;
      url: string;
    }>;
  }>;

  const getCharacters: GetCharacters = async () => {
    const response = await fetch(
      "https://rickandmortyapi.com/api/character?page=2",
    );
    return response.json();
  };
</script>

<Accordion let:Section>
  {#await getCharacters()}
    <Section id={"loading"} isLoading>
      <div slot="header">Loading characters...</div>
    </Section>
  {:then characters}
    {#each characters.results as character}
      <Section id={character.id} let:sectionState>
        <svelte:fragment slot="header" let:sectionState>
          {character.name}, the content has: {sectionState.contentHeight}px
        </svelte:fragment>
        <a href={character.url} target="_blank" slot="aside">⏩️</a>
        {#if sectionState.isOpen}
          <img
            alt="Image for: {character.name}"
            src={character.image}
            style:width="100%"
          />
        {/if}
      </Section>
    {/each}
  {:catch error}
    Error during loading characters
  {/await}
</Accordion>
