<script>
  import { onMount } from "svelte";
  import { toNearestShortHex, random } from "../lib/hex";

  /** @type {import('./$types').PageData} */
  export let data;

  let hex = data.hex;
  let input = null;

  let loaded = false;

  onMount(() => {
    loaded = true;
  });

  $: match = toNearestShortHex(hex);

  function randomize() {
    hex = random();
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    if (event.target.value[0] === "#") {
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
    id="form"
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
    {#if !loaded}
      <p class="no-js">Hit <kbd>enter</kbd> to submit</p>
    {/if}
  </form>
  <div class="color" style:--background-color={match ? `#${match}` : "#ddd"}>
    {#if match}
      <span class="hash">#</span>{match || ""}
    {/if}
  </div>
  <article>
    <h1>Short Hex Codes</h1>
    <p>
      Enter or paste a 6-digit hex color code to find the nearest rounded
      3-digit equivalent. <br /> Need inspiration?
      <button
        type="submit"
        form="random"
        name="c"
        value={random()}
        on:click={randomize}>Generate a random value</button
      > instead.
    </p>
    <p>
      This applet is built with <a href="https://svelte.dev/">Svelte</a> &
      <a href="https://kit.svelte.dev/">SvelteKit</a>. It's progressively
      enhanced and works with or without JavaScript.
    </p>
    <form hidden id="random" on:submit={handleSubmit} />
  </article>
</main>

<style>
  main {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
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
    --background-color: red;

    position: relative;
    display: flex;
    align-items: center;
    font-size: 3rem;
    padding-left: var(--padding);
    background-color: var(--background-color);
    font-family: "Berkeley Mono";
  }

  article {
    padding: var(--padding);
  }

  h1 {
    font-weight: bold;
    text-transform: uppercase;
  }

  button {
    -webkit-appearance: none;
    border: 0;
    padding: 0;
    background: transparent;
    font: inherit;
    text-decoration: underline;
  }

  button:active {
    transform: translateY(1px);
  }

  article > * + * {
    margin-top: 1rem;
  }

  a,
  button {
    color: #444;
  }

  .no-js {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: var(--padding);
    font-size: 13px;
    border: 1px solid currentColor;
    border-bottom-width: 2px;
    opacity: 0;
    padding: 0.125em 0.375em;
    border-radius: 0.25em;
    animation: no-js 0.15s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes no-js {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
</style>
