<script lang="ts">
  import RickAndMorty from "./samples/RickAndMorty.svelte";
  import Svelte from "./assets/svelte.svg";
  import Demo from "./samples/Demo.svelte";
  import WithAside from "./samples/WithAside.svelte";
  import Loading from "./samples/Loading.svelte";
  import pkg from "../package.json";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz@6..12&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<h4 id="demo-header">
  🪗 Svelte Epic Accordion (v. {pkg.version}) Demo Page
  <img src={Svelte} alt="Svelte logo" style="height: 100%;" />
</h4>

<!-- Samples -->
<div id="sample1" class="sample" style:height="550px"><Demo /></div>
<div id="sample2" class="sample"><WithAside /></div>
<div id="sample3" class="sample"><Loading /></div>
<div id="sample4" class="sample" style:height="400px" style:overflow="auto">
  <RickAndMorty />
</div>

<style>
  :global(body) {
    font-family: "Nunito Sans", sans-serif;
  }

  #demo-header {
    font-size: 2rem;
    margin: 1rem 0;
  }

  .sample {
    width: 300px;
    margin: 10px 0;
    font-size: 12px;
  }

  #sample1 {
    overflow-y: auto;
    background-color: #626262;
  }
</style>
