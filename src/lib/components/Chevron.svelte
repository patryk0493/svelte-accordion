<script lang="ts">
  import chevron from "../assets/chevron.svg";

  export let rotated = false;
</script>

<img
  src={chevron}
  alt="chevron"
  data-testid="chevron"
  class:rotate-90={rotated}
  class="chevron"
/>

<style>
  .rotate-90 {
    rotate: 90deg;
  }

  .chevron {
    transition: all 0.2s ease-in;
  }
</style>
