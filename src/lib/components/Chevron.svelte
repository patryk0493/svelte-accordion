<script lang="ts">
  import chevron from "../assets/chevron.svg";

  export let rotated = false;
</script>

<img src={chevron} alt="chevron" class:rotate-90={rotated} class="button" />

<style>
  .rotate-90 {
    rotate: 90deg;
  }

  .button {
    outline: none;
    background: none;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease-in;
  }
</style>
