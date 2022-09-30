<script>
  import "../reset.css";
  import { findNearestShorthandCode } from "../lib/hex";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;
  let input = null;

  $: match = findNearestShorthandCode(hex);

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    if (event.target.value === "") {
      hex = "";
    } else if (event.target.value[0] === "#") {
      hex = event.target.value.substr(1);
    } else {
      hex = event.target.value;
    }
  }

  function focusInput(event) {
    input.focus();
    input.setSelectionRange(0, input.value.length);
  }
</script>

<main>
  <form
    class="color"
    style:background-color={match ? `#${hex}` : "#ddd"}
    on:submit={handleSubmit}
    on:click={focusInput}
  >
    <span class="hash">#</span>
    <input
      bind:this={input}
      bind:value={hex}
      on:input={handleInput}
      on:focus={focusInput}
      name="c"
      autocomplete="off"
    />
  </form>
  <div class="color" style:background-color={match ? `#${match}` : "#ddd"}>
    {#if match}
      <span class="hash">#</span>{match || ""}
    {/if}
  </div>
  <h1>Short Hex Codes</h1>
  <p />
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

  input {
    display: block;
    width: 100%;
    margin: 0 auto;
    font: inherit;
    background-color: transparent;
    border: none;
  }

  input:focus {
    outline: none;
  }

  form {
    cursor: text;
  }

  .hash {
    opacity: 0.15;
  }

  .color {
    display: flex;
    align-items: center;
    font-size: 4rem;
    padding-left: calc(var(--padding) * 2);
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
</style>
