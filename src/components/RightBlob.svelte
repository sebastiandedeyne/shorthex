<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress1 = tweened(0, {
    duration: 6000,
    easing: cubicOut,
  });

  const progress2 = tweened(0, {
    duration: 7000,
    easing: cubicOut,
  });

  onMount(() => {
    progress1.set(Math.random());
    window.setInterval(() => {
      progress1.set(Math.random());
    }, 10000);

    progress2.set(Math.random());
    window.setInterval(() => {
      progress2.set(Math.random());
    }, 8000);
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 676 510">
  <path
    fill-rule="evenodd"
    d={`M596.978 56.845c98.02 55.999 93.527 247.201 44.602 374.134-48.926 126.934-219.025 ${
      78.613 - 78.613 * $progress1
    }-272.412 0-53.387-78.612-38.234-142.469-164.312-123.23C78.777 326.99.739 ${
      240 - 240 * $progress1
    }.54.739 109.226c0-131.314 190.922 39.89 250.91-52.38 59.987-92.27 247.31-56 345.329 0Z`}
  />
</svg>

<style>
  svg {
    width: 100%;
  }

  path {
    fill: var(--fill);
  }
</style>
