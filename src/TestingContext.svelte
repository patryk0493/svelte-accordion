<script lang="ts">
  import { setContext } from "svelte";

  export let Component: any;
  export let contextKey: string;
  export let contextValue: any;
  export let testedComponentProps: any;

  setContext(contextKey, contextValue);
</script>

<svelte:component this={Component} {...testedComponentProps} />
