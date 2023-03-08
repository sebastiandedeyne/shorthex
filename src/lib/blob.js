import { onMount } from "svelte";
import { tweened } from "svelte/motion";
import { quadInOut } from "svelte/easing";

export function tweens({ amount, slack, volatility }) {
  const tweens = Array.from({ length: amount }).map(() => {
    const duration = Math.random() * slack * (volatility / 10) + slack;
    const progress = tweened(0, { duration, easing: quadInOut });

    return { duration, progress };
  });

  onMount(() => {
    tweens.forEach(({ duration, progress }) => {
      progress.set(Math.random() * volatility - volatility / 2);
      window.setInterval(
        () => progress.set(Math.random() * volatility - volatility / 2),
        duration
      );
    });
  });

  return tweens.map(({ progress }) => progress);
}
