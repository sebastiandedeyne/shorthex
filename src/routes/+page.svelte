<script>
  import "../reset.css";
  import { findNearestShorthandCode } from "../lib/hex";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;

  $: match = findNearestShorthandCode(hex);

  function onInput(event) {
    if (event.target.value === "") {
      hex = "";
    } else if (event.target.value[0] !== "#") {
      hex = "#" + event.target.value;
    } else {
      hex = event.target.value;
    }
  }

  function onFocus(event) {
    window.requestAnimationFrame(() => {
      event.target.setSelectionRange(1, event.target.value.length);
    });
  }
</script>

<main>
  <input
    class="color"
    style:background-color={match ? hex : "#ddd"}
    value={hex}
    on:input={onInput}
    on:focus={onFocus}
  />
  <div class="color" style:background-color={match || "#ddd"}>
    {match || ""}
  </div>
  <h1>Short Hex Codes</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis adipisci
    fugit quaerat assumenda laudantium quos ipsa. Quia cupiditate odio a animi
    repellendus? Quo ipsa aliquid magni aliquam odio cupiditate quam.
  </p>
</main>

<style>
  @import url("https://rsms.me/inter/inter.css");

  :global(:root) {
    --padding: 1rem;
  }

  :global(html) {
    font-family: "Inter", sans-serif;
    font-size: 4vmin;
  }

  :global(body) {
    padding: var(--padding);
    line-height: 1.4;
  }

  main {
    height: calc(100vh - var(--padding) * 2);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr min-content;
  }

  h1 {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9em;
    letter-spacing: 0.03em;
    margin-top: var(--padding);
  }

  p {
    margin-top: var(--padding);
    font-weight: 500;
  }

  input {
    display: block;
    width: 100%;
    margin: 0 auto;
    font: inherit;
    background-color: transparent;
    border: none;
    text-align: center;
  }

  input:focus {
    outline: none;
  }

  .color {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
  }
</style>
