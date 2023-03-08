<script>
  import { tweens } from "../lib/blob";

  const [p1, p2, p3, p4, p5, p6] = tweens({
    amount: 6,
    slack: 1500,
    volatility: 30,
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 683 526">
  <path
    fill-rule="evenodd"
    d={`
      M 80,380
      S ${-20 + $p4},${320 + $p2} ${30 + $p6},${160 + $p2}
        ${230 + $p1},${-30 + $p4} ${280 + $p5},${50 + $p6}
        ${350 + $p3},${200 + $p2} ${450 + $p2},${170 + $p3}
        ${620 + $p5},${170 + $p1} ${620 + $p1},${300 + $p2}
        ${470 + $p1},${520 + $p3} ${400 + $p4},${420 + $p6}
        ${180 + $p5},${410 + $p1} 80,380
      Z
    `}
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
