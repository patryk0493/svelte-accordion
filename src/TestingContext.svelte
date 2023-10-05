<script lang="ts">
  import { SvelteComponent, setContext } from "svelte";

  // type T = $$Generic;
  // export let Component: SvelteComponent;

  export let Component: any;
  export let contextKey: string;
  export let contextValue: any;
  export let testedComponentProps: any;

  setContext(contextKey, contextValue);
</script>

<svelte:component this={Component} {...testedComponentProps} />
