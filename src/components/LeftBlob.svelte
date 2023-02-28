<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  const progress1 = tweened(0, {
    duration: 10000,
    easing: cubicOut,
  });

  const progress2 = tweened(0, {
    duration: 8000,
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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 623 466">
  <path
    style:fill="var(--fill)"
    fill-rule="evenodd"
    d={`M81.207 377.937c-98.02-57-97.852-${
      139.463 - 139.463 * $progress1
    }-48.926-266.396C81.207-15.392 227.613-30.305 281 48.308c53.387 78.612 65.086 152.813 164.313 ${
      123.23 - 123.23 * $progress2
    } 99.226-29.585 177.37-1.9 177.37 129.414S474.286 524.535 398.52 422.442c-75.766-102.093-219.293 11.495-317.313-44.505Z`}
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
