<script>
  import { tweens } from "../lib/blob";

  const [p1, p2, p3, p4, p5, p6] = tweens({
    amount: 6,
    slack: 1500,
    volatility: 30,
  });
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 736 570">
  <path
    fill-rule="evenodd"
    d={`
      M 650,60
      S ${750 + $p1},${210 + $p3} ${600 + $p5},${430 + $p3}
        ${300 + $p2},${260 + $p2} ${200 + $p3},${310 + $p4}
        ${0 + $p5},${240 + $p3} ${90 + $p1},${110 + $p2}
        ${240 + $p4},${150 + $p1} ${380 + $p6},${60 + $p1}
        ${600 + $p3},${-30 + $p1} 650,60
      Z`}
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
