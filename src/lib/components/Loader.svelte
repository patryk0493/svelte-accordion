<div class="loader" />

<style>
  :root {
    --loader: 2px;
    --loader-color: rgb(249, 178, 13);
    --animation-duration: 1s;
  }

  .loader {
    height: var(--loader);
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  .loader:after {
    content: "";
    display: block;
    animation: lineAnim var(--animation-duration) linear infinite;
    background: var(--loader-color);
    height: 100%;
  }

  @keyframes lineAnim {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
