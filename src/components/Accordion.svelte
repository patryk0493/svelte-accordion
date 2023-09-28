<script lang="ts">
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import AccordionSection from "@/components/AccordionSection.svelte";
  import type { Context, SectionLookup } from "@/lib/model.type";
  import { accordion } from "@/actions/accordion.action";

  const parentHeight = writable<number>(0);
  const sections = writable<SectionLookup>({});

  setContext<Context>("model", { sections });
</script>

<main use:accordion={{ parentHeight, sections }} {...$$restProps}>
  <slot Section={AccordionSection} />
</main>

<style>
  main {
    color: white;
  }
</style>
