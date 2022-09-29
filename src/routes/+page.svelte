<script>
  import "../reset.css";
  import { findNearestShorthandCode } from "../lib/hex";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;

  $: match = findNearestShorthandCode(hex);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    if (event.target.value === "") {
      hex = "";
    } else if (event.target.value[0] !== "#") {
      hex = "#" + event.target.value;
    } else {
      hex = event.target.value;
    }
  }

  function handleFocus(event) {
    window.requestAnimationFrame(() => {
      event.target.setSelectionRange(1, event.target.value.length);
    });
  }
</script>

<main>
  <form on:submit={handleSubmit}>
    <input
      class="color"
      style:background-color={match ? hex : "#ddd"}
      value={hex}
      on:input={handleInput}
      on:focus={handleFocus}
      name="c"
      autocomplete="off"
    />
  </form>
  <div class="color" style:background-color={match || "#ddd"}>
    {match || ""}
  </div>
  <h1>Short Hex Codes</h1>
  <p></p>
</main>

<style>
  @import url("https://rsms.me/inter/inter.css");

  :global(:root) {
    --padding: 2rem;
  }

  :global(html) {
    font-family: "Inter", sans-serif;
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
    margin-top: calc(var(--padding) / 2);
  }

  p {
    margin-top: calc(var(--padding) / 2);
    font-weight: 500;
  }

  form {
    display: contents;
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
    font-size: 4rem;
  }
</style>
